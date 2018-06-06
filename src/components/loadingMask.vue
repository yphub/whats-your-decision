<template>
    <div :class="{loading}" :style="{display}" @transitionend="onTransitionEnd" id='LoadingMask'>
        <div class="loading">
            <div class="icon-loading"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: "",
  props: ["loading"],
  data() {
    return {
      display: "inherit"
    };
  },
  watch: {
    loading(val) {
      if (val) this.display = "inherit";
    }
  },
  methods: {
    onTransitionEnd() {        
      if (!this.loading) this.display = "none";
    }
  }
};
</script>

<style lang='scss'>
#LoadingMask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity ease-in-out 0.4s;
  opacity: 0;
  &.loading {
    opacity: 1;
  }
  .loading {
    animation: loading-rotate 1s ease infinite;
    > .icon-loading:before {
      font-family: "iconfont";
      font-size: 30px;
      color: white;
      content: "\e680";
    }
  }
  @keyframes loading-rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>