<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <!-- using v-bind with inheritAttrs will give us an option to pass the
    attrs defined on component to the children (but not all using v-bind defines
    which child should get the attributes) -->
    <input type="text" :value="value" @input="updateValue" v-bind="$attrs" />
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
