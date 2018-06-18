<template>
  <div id='my'>
    <!-- <text>我的决策</text> -->
    <div v-for="(item,index) in items" :key="index" class="item" @click="JumpShow(index)">
      <div class="image" :style="{'background-image':item.imgurl}"></div>
      <div class="datetime">
        <text class="time">{{item.time}}</text>
        <text class="date">{{item.date}}</text>
      </div>
    </div>
    <template v-if="true || pages!==1">
      <picker @change="onResultNumChange" :range="pageArr">
        <div class="page-picker">
          页面:
          <div>{{pageat}}
            <div class="result-xiala"></div>
            (只有分享了的决策才会在这里哦)
          </div>
        </div>
      </picker>
      <div class="pagebtn">
        <button :disabled="pageat==1" @click="pageat++">上一页</button>
        <button :disabled="pageat==pages" @click="pageat--">下一页</button>
      </div>
    </template>
    <loadingMask :loading="loading"></loadingMask>
  </div>
</template>

<script>
import loadingMask from "@/components/loadingMask";
export default {
  name: "",
  components: {
    loadingMask
  },
  data() {
    return {
      items: [],
      pageat: 1,
      pages: 1,
      loading: true
    };
  },
  computed: {
    pageArr() {
      var arr = [];
      for (let i = 0; i < this.pages; ++i) arr.push(i + 1);
      return arr;
    }
  },
  watch: {
    pageat() {
      this.datUpdate();
    }
  },
  methods: {
    async datUpdate(init) {
      this.loading = true;
      this.items = [];
      try {
        // var {data} =
        var { data: { items, pages, state } } = await wx.get(
          init ? "/my" : `/my/${this.pageat}`
        );
      } catch (IntervalServerError) {
        console.log(IntervalServerError);
        return wx.showToast({
          title: "服务器开小差啦，请稍后再试",
          icon: "none"
        });
      }
      if (state === -1) {
        await wx.loginserver();
        return this.datUpdate();
      }
      let host = getApp().globalData.host;
      for (let item of items) {
        if (item === undefined) continue;
        // debugger;
        item.createdAt = new Date(item.createdAt);
        item.time = `${item.createdAt.getHours()}:${item.createdAt.getMinutes()}`;
        item.date = `${item.createdAt.getFullYear()}-${item.createdAt.getMonth() +
          1}-${item.createdAt.getDate()}`;
        item.imgurl = item.list[0].imgurl;
        if (item.imgurl.indexOf("/uploads/") === 0)
          item.imgurl = `url(${host}${item.imgurl})`;
      }
      if (pages !== undefined) this.pages = pages;
      this.items = items;
      //这里可能会被跳过动画监听，因此添加loadingcaller
      var loadingcaller = () => {
        if (this.loading === true) this.loading = false;
        else setTimeout(loadingcaller, 50);
      };
      loadingcaller();
    },
    JumpShow(index) {
      let showdata = this.items[index];
      let { globalData } = getApp();
      let host = globalData.host;
      for (let listitem of showdata.list)
        if (listitem.imgurl.indexOf("/uploads/") === 0)
          listitem.imgurl = `${host}${listitem.imgurl}`;

      globalData.ShowData = showdata;
      wx.navigateTo({
        url: `/pages/shuffle/main`
      });
    }
  },
  mounted() {
    this.datUpdate(true);
  }
};
</script>

<style lang='scss'>
#my {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > .item {
    display: flex;
    flex-direction: row;
    width: 80%;
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
    padding: 10px;
    height: 80px;
    background-color: white;
    > .image {
      background-size: cover !important;
      background-position: center !important;
      width: 80px;
      border-radius: 5px;
    }
    > .datetime {
      text-align: right;
      flex-grow: 2;
      font-size: 15px;
      color: gray;
      display: flex;
      flex-direction: column;
      margin-right: 15px;
      > .time {
        font-size: 45px;
        flex-grow: 2;
      }
    }
  }

  .page-picker {
    font-size: 12px;
    padding: 10px 0px;
    display: flex;
    > view {
      display: flex;
      margin: 0px 3px;
    }
    .result-xiala:before {
      font-family: "iconfont";
      transform: translateY(2px);
      margin-left: 5px;
      content: "\e654";
    }
  }
  .pagebtn {
    width: 80%;
    display: flex;
    > button {
      flex-grow: 2;
      border-color: transparent !important;

      &:nth-child(1) {
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
      }
      &:nth-child(2) {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
      }
      &::after {
        border: none;
      }
    }
  }
}
</style>