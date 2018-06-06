<template>
    <div :class="{loading:loading.sum}" :style="{display}" @animationend="onTransitionEnd" id='upLoadingMask'>
        <progress :percent="loadingper" />
        <span>{{loading.at}}/{{loading.sum}}</span>
    </div>
</template>

<script>
export default {
  name: "",
  props: ["loading"],
  data() {
    return {
      display: "flex"
    };
  },
  watch: {
    "loading.sum"(val) {
      if (val) this.display = "flex";
    }
  },
  computed: {
    loadingper() {
      return Math.round(this.loading.at * 100 / this.loading.sum);
    }
  },
  methods: {
    onTransitionEnd() {
      if (!this.loading.sum) this.display = "none";
    }
  }
};
</script>

<style lang='scss'>
#upLoadingMask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation: fadeOut ease-in-out 0.4s;
  animation-fill-mode: forwards;
  background: rgba(0, 0, 0, 0.4);
  &.loading {
    animation: fadeIn ease-in-out 0.4s;
  }
  progress {
    width: 80%;
    height: 40px;
  }
  span {
    color: white;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
}
</style>