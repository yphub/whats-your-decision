<template>
  <div id='Single'>
    <div class="select-container" :class="{small:selectArr.length > 3}">
      <selectBlock v-for="(item,index) in selectArr" :key="index" :selectData="item" @image="onImage(index)" :deleteOn="deleteOn" @edit="detailIndexAt=index" @tiggledelete="deleteOn=arguments[0]" @delete="selectArr.splice(index,1)" />
      <selectBlock :selectData="{imgurl:''}" @image="onImage(-1)" @edit="onEditPlus" />
    </div>
    <picker @change="onResultNumChange" :range="resultNumArr" :disabled="decisionNum==0">
      <div class="result-num-picker">
        决策
        <div>{{decisionNum}}
          <div class="result-xiala"></div>
        </div>个事件
      </div>
    </picker>
    <div class="decide-container">
      <button :disabled='selectArr.length == 0' @click="GoToShuffle" open-type="getUserInfo">摇一摇决策</button>
      <div class="open-direct" @click="showDirect=true"></div>
    </div>
    <detailBlock v-if="detailIndexAt !== false" @close="detailIndexAt = false;" @certain="ChangeDetail" :selectData="selectArr[detailIndexAt]" />
    <div v-if="showDirect!==false">
      <directBlock @hidden="showDirect=false" />
    </div>
  </div>
</template>

<script>
import selectBlock from "@/components/selectBlock";
import detailBlock from "@/components/detailBlock";
import directBlock from "@/components/directBlock";
export default {
  name: "",
  components: {
    selectBlock,
    detailBlock,
    directBlock
  },
  computed: {
    resultNumArr() {
      var arr = [];
      var len = this.selectArr.length;
      for (var i = 1; i <= len; ++i) arr.push(i);

      if (this.decisionNum >= len) this.decisionNum = len;
      else if (len != 0 && this.decisionNum == 0) this.decisionNum = 1;

      return arr;
    }
  },
  watch: {
    goshuffle(val) {
      if (val === true) this.GoToShuffle();
    }
  },
  data() {
    return {
      selectArr: [],
      deleteOn: false,
      decisionNum: 1,
      detailIndexAt: false,
      goshuffle: false,
      showDirect: true
    };
  },
  onShow() {    
    wx.onAccelerometerChange(res => {
      if (
        res.x * res.x + res.y * res.y + res.z * res.z > 2 &&
        this.detailIndexAt === false &&
        this.selectArr.length !== 0
      )
        this.goshuffle = true;
    });
  },
  onHide() {
    wx.stopAccelerometer();
    this.goshuffle = false;
  },
  methods: {
    onEditPlus() {
      if (this.deleteOn === true) this.deleteOn = false;
      else this.detailIndexAt = -1;
    },
    onImage(index) {
      if (this.deleteOn === true) {
        this.deleteOn = false;
        return;
      }
      wx.chooseImage({
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: res => {
          res.tempFilePaths.forEach(imgurl => {
            // imgurl = `url(${imgurl})`;
            if (this.selectArr[index] != undefined)
              this.selectArr[index].imgurl = imgurl;
            else
              this.selectArr.push({
                imgurl,
                text: ""
              });
            index == -1 || index++;
          });
        }
      });
    },
    onResultNumChange(e) {
      this.decisionNum = +e.mp.detail.value + 1;
    },
    ChangeDetail(detail) {
      if (this.detailIndexAt == -1) this.selectArr.push(detail);
      else this.selectArr[this.detailIndexAt] = detail;
      this.detailIndexAt = false;
    },
    GoToShuffle() {
      getApp().globalData.ShuffleData = {
        arr: this.selectArr,
        num: this.decisionNum
      };
      wx.navigateTo({
        url: "/pages/shuffle/main"
      });
    }
  }
};
</script>

<style lang='scss'>
#Single {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .select-container {
    display: flex;
    flex-wrap: wrap;
    padding: 4%;
    width: 92%;
    flex-grow: 2;
    align-content: flex-start;
    overflow-x: hidden;
    &.small > .selectBlock {
      flex-basis: 33%;
      height: 250rpx;
      .select-add {
        font-size: 100rpx !important;
      }
    }
  }

  .result-num-picker {
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

  .decide-container {
    margin-bottom: 40rpx;
    width: 92%;
    position: relative;
    > button {
      width: 100%;
    }
    > .open-direct:before {
      content: "\e60e";
      font-family: "iconfont";
    }
    > .open-direct {
      position: absolute;
      width: 20px;
      background: #007bff;
      height: 20px;
      right: 0;
      bottom: 55px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      color: white;
      font-size: 30px;
      border-radius: 50%;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>