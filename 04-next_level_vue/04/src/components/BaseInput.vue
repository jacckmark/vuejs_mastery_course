<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <!-- using v-bind with inheritAttrs will give us an option to pass the
    attrs defined on component to the children (but not all using v-bind defines
    which child should get the attributes) -->
    <input
      type="text"
      :value="value"
      @input="updateValue"
      v-bind="$attrs"
      v-on="listeners"
    />
  </div>
</template>

<script>
  export default {
    // this set to false will result in inheriting attributes of parents by children
    // so if we give our baseinput component the type and placeholder in component
    // where we are using it it will pass the attributes down
    inheritAttrs: false,
    props: {
      label: {
        type: String,
        default: "",
      },
      value: [String, Number],
    },
    computed: {
      // here we have added the listeners method which will allow us to use
      // $listeners (so we can still hear events from parent scope), but this
      // will also resolve problem with conflicting values of our input (we are
      // simply overwriting them with result from updatedValue method). Our
      // problem with value of this input occurs because the @input is conflicting
      // with input from $listeners
      listeners() {
        return {
          ...this.$listeners,
          input: this.updateValue,
        };
      },
    },
    methods: {
      updateValue(event) {
        this.$emit("input", event.target.value);
        // when the value of our input gets updated we are emmiting the event with
        // value of input (then we can use v-model on our base component in place
        // where we are using it to bind the value to it)
      },
    },
  };
</script>

<style>
</style>
