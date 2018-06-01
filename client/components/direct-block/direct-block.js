Component({
  properties: {
    // 这里定义了detailText属性，属性值可以在组件使用时指定
    detailText: {
      type: Object,
      value: {},
    }
  },
  data: {
    // 这里是一些组件内部数据

  },
  methods: {
    // 这里是一个自定义方法
    closeWindow:function(){
      this.triggerEvent('close')
    }
  }
})