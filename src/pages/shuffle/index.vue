<template>
  <div id="Shuffle">
    <div class="inner">
      <div v-if="shuffleLoading" class="shuffle-loading">
        <text class="icon-loading"></text>
      </div>
      <div v-else class="shuffle-result">
        <swiper :indicator-dots="true" :skip-hidden-item-layout='true'>
          <swiper-item v-for="(item,index) in resultArr" :key="index" class="item">
            <div class="item-card">
              <template v-if="index == 0">
                <text class="title-bg">最佳决策</text>
                <text class="title">最佳决策</text>
              </template>
              <template v-else>
                <text class="title-bg">第{{ index + 1 }}决策</text>
                <text class="title">第{{ index + 1 }}决策</text>
              </template>

              <div class="item-image" :style='{background:item.imgurl}'></div>
              <text class="footer" v-if="item.text">{{ item.text }}</text>
            </div>
          </swiper-item>
        </swiper>
        <div class="button-group">
          <button @click="shareMenu" open-type="share" type="primary">分享</button>
          <button @click="goBack">返回</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      operate: {
        arr: [],
        num: 0
      },
      shuffleLoading: true
    };
  },
  computed: {
    resultArr() {
      return this.operate.arr.slice(0, this.operate.num);
    }
  },
  methods: {
    ShuffleArray() {
      const arr = this.operate.arr;
      const length = arr.length;
      for (let i = 0; i < length; ++i) {
        const x = Math.floor(Math.random() * length);
        const y = Math.floor(Math.random() * length);
        [arr[x], arr[y]] = [arr[y], arr[x]];
      }
    },
    goBack() {
      wx.navigateBack();
    },
    shareMenu() {
      wx.showShareMenu({
        withShareTicket: true,
        success() {},
        fail() {
          console.log(arguments);
        }
      });
    }
  },
  async mounted() {
    this.operate = JSON.parse(JSON.stringify(getApp().globalData.ShuffleData));
    this.ShuffleArray();
    this.shuffleLoading = false;
    var res = await wx.get("/");
    console.log(res);
  },
  onShareAppMessage(res) {
    return {
      title: "自定义转发标题",
      path: "/page/user?id=123"
    };
  }
};
</script>

<style lang='scss'>
#Shuffle {
  .inner {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    > .shuffle-loading {
      animation: loading-rotate 1s ease infinite;
      > .icon-loading:before {
        font-family: "iconfont";
        font-size: 30px;
        color: white;
        content: "\e680";
      }
    }
    > .shuffle-result {
      width: 100%;
      height: 85%;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      > swiper {
        flex-grow: 2;
        .item,
        .item-card {
          display: flex;
          flex-direction: column;
        }
        .item {
          padding-left: 10%;
          padding-right: 10%;
          width: 80% !important;
          height: 80% !important;
          top: 10%;
          overflow: visible;
          > .item-card {
            height: 100%;
            background: white;
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
            padding: 5%;
            position: relative;
            > .item-image {
              flex-grow: 2;
              background-position: center !important;
              background-size: cover !important;
              background-repeat: no-repeat !important;
            }
            > text.title,
            text.title-bg {
              font-family: "iconfont";
              z-index: 0;
              font-size: 60px;
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              transform: translateY(-50%);
            }
            > text {
              text-align: center;
            }
            > text.title-bg {
              -webkit-text-stroke: 10px white;
            }
            > text.footer {
              padding-top: 10px;
            }
          }
        }
      }
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

  .button-group {
    margin: 0 10%;
    > button + button {
      margin-top: 10rpx;
    }
  }
}
</style>