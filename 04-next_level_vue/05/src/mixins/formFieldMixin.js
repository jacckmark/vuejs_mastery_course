// mixins give us an option to extract and reuse parts of components that are
// repeated multiple times
export const formFieldMixin = {
  inheritAttrs: false,
  props: {
    label: { type: String, default: "" },
    value: [String, Number],
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    },
  },
};
