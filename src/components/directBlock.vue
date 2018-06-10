<template>
  <div class='directBlock' :class="{show}" @transitionend="changeState" @touchstart="show=false">
    <div class="direct">
      <div class="showAreablock">
        <div class="topArea"></div>
        <div class="body">
          <div class="showArealeft"></div>
          <div class="showArea"></div>
          <div class="showArearight"></div>
        </div>
        <div class="bottomArea"></div>
      </div>
      <div class="demo">
        <view class="iconfont icon-huadong" id="showArea1"></view>
        <view class="iconfont icon-handtouch" id="showIconfont"></view>
        <view class="showTextTop">
          <span>按住“+”右滑选择图片</span>
          <span>按住“+”左滑撰写文本</span>
          <span>或选择颜色</span>
          <span>长按开启删除</span>
        </view>
        <view class="showTextBottom">
          <span>这里修改您的决策数量</span>
          <view class="iconfont icon-changjiantou-copy" id="showArea2"></view>
        </view>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "",
  prop: [],
  data() {
    return {
      show: false
    };
  },
  methods: {
    changeState() {
      if (this.show === false) this.$emit("hidden");
    }
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 50);
  }
};
</script>

<style lang="scss">
//动画
@keyframes showIconfont {
  0% {
    transform: rotate(0.9turn) translate(-150rpx, 0) scale(0.9);
    margin-left: 0%;
  }
  15% {
    transform: rotate(0.9turn) translate(-150rpx, 0) scale(0.8);
    margin-left: 0%;
  }
  49% {
    transform: rotate(0.9turn) translate(-150rpx, 0) scale(0.8);
    margin-left: 20%;
  }
  50% {
    transform: rotate(0.9turn) translate(-150rpx, 0) scale(0.9);
    margin-left: 0%;
  }
  65% {
    transform: rotate(0.9turn) translate(-150rpx, 0) scale(0.8);
    margin-left: 0%;
  }
  100% {
    transform: rotate(0.9turn) translate(-150rpx, 0) scale(0.8);
    margin-left: -20%;
  }
}
@keyframes showArea1 {
  49% {
    transform: translate(-100rpx, 50rpx) rotate(0turn) scale(0.8, 0.5);
  }
  50% {
    transform: translate(-250rpx, 71rpx) rotate(0.5turn) scale(0.8, 0.5);
  }
  100% {
    transform: translate(-250rpx, 71rpx) rotate(0.5turn) scale(0.8, 0.5);
  }
}
.directBlock {
  font-family: "iconfont" !important;
  transition: all ease-in-out 0.4s;
  opacity: 0;
  &.show {
    opacity: 1;
  }
  > .direct {
    position: fixed;
    top: 0%;
    bottom: 0%;
    left: 0%;
    right: 0%;
    display: flex;
    flex-direction: column;
    align-items: center;
    > .showAreablock {
      > .topArea {
        position: fixed;
        left: 0%;
        top: 0%;
        height: 3%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.8);
      }
      > .body {
        position: fixed;
        top: 3%;
        left: 0%;
        width: 100%;
        height: 87%;
        display: flex;
        flex-direction: row;
        > .showArealeft {
          height: 100%;
          width: 3%;
          background-color: rgba(0, 0, 0, 0.8);
        }
        > .showArea {
          height: 100%;
          width: 94%;
        }
        > .showArearight {
          height: 100%;
          width: 3%;
          background-color: rgba(0, 0, 0, 0.8);
        }
      }
      > .bottomArea {
        position: fixed;
        top: 90%;
        left: 0%;
        height: 10%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.8);
      }
    }
    > .demo {
      position: fixed;
      top: 0%;
      bottom: 0%;
      left: 0%;
      right: 0%;
      z-index: 3;
      display: flex;
      flex-direction: column;
      align-items: center;
      > .showTextTop {
        position: absolute;
        left: 50px;
        top: 140px;
      }
      > .showTextBottom {
        position: absolute;
        left: 75px;
        bottom: 45px;
      }
    }
  }
}
#showIconfont {
  position: relative;
  top: -235rpx;
  font-size: 200rpx;
  transform: rotate(0.9turn) translate(-150rpx, 0);
  animation: showIconfont 3s infinite linear;
}
#showArea1 {
  position: relative;
  font-size: 200rpx;
  transform: translate(-100rpx, 50rpx) scale(0.8, 0.5);
  opacity: 0.6;
  animation: showArea1 3s infinite linear;
}
#showArea2 {
  transform: rotate(0.33turn);
  margin-top: 75px;
  font-size: 40px !important;
}
span {
  font-size: 20px;
  // line-height: 42rpx;
  word-break: normal;
  width: auto;
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
  color: #444;
  margin-top: 20rpx;
}
.iconfont {
  font-size: 16px;
  font-style: normal;
}
.icon-huadong:before {
  content: "\e662";
}

.icon-handtouch:before {
  content: "\e64e";
}

.icon-changjiantou-copy:before {
  content: "\e600";
}
</style>


