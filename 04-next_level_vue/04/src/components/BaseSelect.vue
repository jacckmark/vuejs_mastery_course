<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <!-- adding v-on="$listeners" will allow the select component to hear the 
    events from the parent scope -->
    <select
      :value="value"
      @change="updateValue"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <!-- thanks to selected we can recieve the selected value in baseselect 
        and set it -->
      <option
        v-for="option in options"
        :value="option"
        :key="option.id"
        :selected="option === value"
        >{{ option }}</option
      >
    </select>
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      options: {
        type: Array,
        required: true,
      },
      label: {
        type: String,
        default: "",
      },
      value: [String, Number],
    },
    methods: {
      updateValue(event) {
        this.$emit("input", event.target.value);
      },
    },
  };
</script>

<style>
</style>
