<template>
  <div>
    <label v-if="label">{{ label }}</label>
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
  // here we are importing and using our mixin (in order to lower the amount
  // of code that gets repeated)
  import { formFieldMixin } from "../mixins/formFieldMixin";
  export default {
    mixins: [formFieldMixin],
    computed: {
      listeners() {
        return {
          ...this.$listeners,
          input: this.updateValue,
        };
      },
    },
  };
</script>

<style>
</style>
