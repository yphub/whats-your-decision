import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    navigationBarTitleText: "决策结果",
    navigationBarBackgroundColor: "#b2b2b2",
    disableScroll: true
  }
}