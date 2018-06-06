<template>
    <swiper id='resultSwiper' :indicator-dots="true" :skip-hidden-item-layout='true'>
        <swiper-item v-for="(item,index) in items" :key="index" class="item">
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
</template>

<script>
export default {
  name: "",
  props: ["items"],
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang='scss'>
#resultSwiper {
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
</style>