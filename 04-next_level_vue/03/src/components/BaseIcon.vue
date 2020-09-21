<template>
  <div class="icon-wrapper" v-html="svg">
    <slot></slot>
  </div>
</template>

<script>
  import feather from "feather-icons";
  export default {
    props: {
      name: String,
      width: {
        type: [String, Number],
        default: 24,
      },
      height: {
        type: [String, Number],
        default: 24,
      },
    },
    computed: {
      svg() {
        return feather.icons[this.name].toSvg({
          class: "icon",
          width: this.width,
          height: this.height,
        });
      },
    },
  };
</script>

<style scoped></style>
