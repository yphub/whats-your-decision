<template>
  <div id="detailBlock" :class="{isin}" @transitionend="onAnimateEnd">
    <div class='inner'>
      <div class="close" @tap="EmitClose"></div>
      <div class="image" @tap="AlterImage" :style="{background:ownSelectData.imgurl}">
        <image v-if="isUrlImage" mode="aspectFill" :src="ownSelectData.imgurl" />
        <text v-if="ownSelectData.imgurl==''">点此添加图片</text>
      </div>
      <div class="pad">
        <input placeholder="填写文本概要" :class="{focus:inputFocusClass}" v-model.lazy="ownSelectData.text" @focus='inputFocusClass=true' @blur='inputFocusClass=false' />
      </div>
      <div class="hr-bottom"></div>
      <div class="color pad">
        <div v-for="(item,index) in colorSelectArr" :key="index" class="color-each" :class="{'focus':ownSelectData.imgurl==item}" :style="{background:item}" @tap="SetColor(item)">
          <image v-if="colorSelectArrLen - 1 === index" mode="aspectFill" :src="item" />
        </div>
      </div>
      <div class="certain" hover-class="certain-hover" @tap="EmitCertain">
        确定
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    selectData: {
      type: Object,
      default: function() {
        return {
          imgurl: "",
          text: ""
        };
      }
    }
  },
  data() {
    return {
      isin: false,
      inputFocusClass: false,
      colorSelectArr: [
        "#007bff",
        "#6c757d",
        "#28a745",
        "#dc3545",
        "#ffc107",
        "#17a2b8",
        "#343a40",
        "#563d7c",
        "#ca8a00",
        "#f42ced"
      ],
      ownSelectData: JSON.parse(JSON.stringify(this.selectData))
    };
  },
  computed: {
    colorSelectArrLen() {
      return this.colorSelectArr.length;
    },
    isUrlImage() {
      return this.ownSelectData.imgurl.indexOf("://") !== -1;
    }
  },
  methods: {
    EmitCertain() {
      this.AnimateThen(() => {
        this.$emit("certain", this.ownSelectData);
      });
    },
    EmitClose() {
      this.AnimateThen(() => {
        this.$emit("close");
      });
    },
    AlterImage() {
      wx.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: res => {
          var imgurl = res.tempFilePaths[0];
          this.ownSelectData.imgurl = imgurl;
          this.colorSelectArr[
            this.colorSelectArr.length - 1
          ] = this.ownSelectData.imgurl;
        }
      });
    },
    SetColor(color) {
      this.ownSelectData.imgurl = color;
    },
    AnimateThen(func) {
      this._animatethen = func;
      this.isin = false;
    },
    onAnimateEnd() {
      if (this._animatethen instanceof Function) {
        this._animatethen.call(this);
        delete this._animatethen;
      }
    }
  },
  mounted() {
    this.colorSelectArr.push(this.ownSelectData.imgurl);
    setTimeout(() => {
      this.isin = true;
    }, 50);
  }
};
</script>

<style lang='scss'>
#detailBlock {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.1);
  transition: all ease-in-out 0.4s;
  opacity: 0;
  &.isin {
    opacity: 1;
    > .inner {
      transform: translateY(0%);
    }
  }

  > .inner {
    position: fixed;
    left: 10%;
    top: 10%;
    bottom: 10%;
    right: 10%;
    background: white;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    transition: all ease-in-out 0.4s;
    transform: translateY(100%);
    .close:before {
      font-family: "iconfont" !important;
      font-size: 16px;
      padding: 10px;
      position: absolute;
      right: 0;
      z-index: 100;
      content: "\e611";
    }

    .hr-bottom {
      height: 1px;
      background: #ced4da;
    }

    .image {
      flex-basis: 40%;
      flex-grow: 2;
      transition: all ease-in-out 0.4s;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      >text{
        color: gray;
      }
    }

    .pad {
      padding: 4%;
    }
    .color {
      display: flex;
      flex-wrap: wrap;
      > .color-each {
        margin: 15rpx;
        height: 50rpx;
        width: 50rpx;
        border-radius: 3px;
        border: 1px;
        position: relative;
      }
    }

    input {
      border: 1px solid #ced4da;
      border-radius: 3px;
      margin-top: 10rpx;
      transition: all ease-in-out 0.15s;
      padding: 10rpx 25rpx;
    }

    input.focus,
    .color-each.focus {
      border-color: #80bdff;
      box-shadow: 0 0 0 10rpx rgba(0, 123, 255, 0.25);
    }

    .certain {
      text-align: center;
      padding: 10px;
      color: white;
      background: #28a745;
      transition: background-color ease-in-out 0.15s;
      &-hover {
        background: #1e7e34;
      }
    }
  }
}
</style>