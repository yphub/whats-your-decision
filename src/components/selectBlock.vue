<template>
  <div class='selectBlock' ref="mainblock">
    <view class="outer" :class="{'outer-hover':componentHover}" @tap="EmitItap" @touchstart="onTouchStart" @touchend="onTouchEnd" @touchmove="onTouchMove">
      <view class="inner" :class="{'select-add':selectData.text===undefined}" :style="{background:selectData.imgurl}">
        <image v-if="isUrlImage" mode="aspectFill" :src="selectData.imgurl" />
      </view>
      <text v-if="selectData.text">{{selectData.text}}</text>
      <view class="mask">
        <view class="iconfont inner" :class="{'mask-hover':optionHoverLeft}">
          <view class="icon-detail"></view>
        </view>
        <view class="iconfont inner" :class="{'mask-hover':optionHoverRight}">
          <view class="icon-picture"></view>
        </view>
      </view>
      <view class="iconfont icon-close" :class="{deleteOn}" @tap.stop="$emit('delete')"></view>
    </view>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["selectData", "deleteOn"],
  data() {
    return {
      componentHover: false,
      optionHoverLeft: false,
      optionHoverRight: false
    };
  },
  computed: {
    isUrlImage() {
      return this.selectData.imgurl.indexOf("://") !== -1;
    }
  },
  methods: {
    EmitItap() {
      if (this.longPressed) return delete this.longPressed;
      if (this.deleteOn === true) this.$emit("tiggledelete", false);
      else this.$emit("edit");
    },
    EmitTiggleDelete() {
      //这里的长按并不是longpress，因为longpress无法设置长按时间并且时间过短，我们在这里重新封装
      this.longPressed = true;
      this.onTouchEnd();
      this.$emit("tiggledelete", true);
    },
    onTouchStart(e) {
      var timehandler = +new Date();
      this.touchStartTime = timehandler;
      this.componentHover = true;
      this.touchOffset = e.touches[0].pageX;
      //长按延时
      setTimeout(() => {
        if (this.touchStartTime === timehandler) this.EmitTiggleDelete();
      }, 750);
    },
    onTouchEnd(e) {
      var data = {
        optionHoverLeft: this.optionHoverLeft,
        optionHoverRight: this.optionHoverRight
      };
      delete this.touchStartTime;
      this.componentHover = false;
      this.optionHoverLeft = false;
      this.optionHoverRight = false;
      if (!e) this.touchOffset = undefined;
      if (this.touchOffset == undefined) return;
      var point = e.mp.changedTouches[0];
      var query = wx.createSelectorQuery().in(this.$root.$mp.page);
      var id = this.$parent.$children.indexOf(this);
      if (id == 0) id = this.$parent.$children.length - 1;
      else id--;
      query
        .selectAll(".outer")
        .boundingClientRect(res => {
          res = res[id];
          if (point.pageY > res.top && point.pageY < res.bottom) {
            if (data.optionHoverLeft) this.$emit("edit");
            else if (data.optionHoverRight) this.$emit("image");
          }
        })
        .exec();
    },
    onTouchMove(e) {
      var offset = e.touches[0].pageX - this.touchOffset;
      delete this.longPressed;
      if (offset > 10) {
        this.optionHoverRight = true;
        this.optionHoverLeft = false;
        delete this.touchStartTime;
      } else if (offset < -10) {
        this.optionHoverLeft = true;
        this.optionHoverRight = false;
        delete this.touchStartTime;
      } else {
        this.optionHoverLeft = false;
        this.optionHoverRight = false;
      }
    }
  }
};
</script>

<style lang='scss'>
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
}

.selectBlock {
  flex-basis: 49%;
  height: 300rpx;
  position: relative;
  transition: all ease-in-out 0.4s;
  > .outer {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 5%;
    bottom: 5%;
    left: 5%;
    right: 5%;
    background: white;
    display: flex;
    flex-direction: column;
    padding: 5%;
    > .inner {
      flex-grow: 2;
      background-size: cover !important;
      background-position: center !important;
      background-repeat: no-repeat !important;
      transition: all ease-in-out 0.4s;
      position: relative;
      > image {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
      &.select-add {
        font-family: "iconfont";
        &:before {
          content: "\e727";
        }
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 200rpx;
        color: #666;
      }
    }
    > text {
      text-align: center;
      font-size: 15px;
      padding: 3px;
    }
    > .mask {
      display: flex;
      justify-content: space-between;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      opacity: 0;
      transition: all ease-in-out 0.4s;
      background-color: rgba(0, 0, 0, 0.2);
      transform: scale(0.8);
      > .inner {
        flex-basis: 49.5%;
        transition: all ease-in-out 0.4s;
        transform: scale(0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        > view {
          transition: all ease-in-out 0.4s;
          transform: scale(1.5);
          /* color: #dddddd; */
          color: white;
        }
      }
    }
    .icon-close {
      position: absolute;
      right: 0;
      top: 0;
      color: red;
      transform-origin: 100% 6.521744%;
      transform: translateY(-1.5px) scale(0);
      transition: transform ease-out .4s;
      &.deleteOn {
        transform: translateY(-1.5px) scale(2.5);
      }
    }

    &-hover > .mask {
      transform: scale(1);
      opacity: 1;
      > .mask-hover {
        background-color: rgba(0, 0, 0, 0.5);
        transform: scale(1) !important;
        > view {
          font-size: 20px;
        }
      }
    }
  }
}

.icon-close:before {
  content: "\e676";
}

.icon-picture:before {
  content: "\e61f";
}

.icon-detail:before {
  content: "\e60a";
}
</style>