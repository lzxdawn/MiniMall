// pages/home/childCpns/x-recommend/x-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommends:{
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isImageLoad: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleImageLoad() {
      if (!this.data.isImageLoad) {
        this.triggerEvent('imageLoad')
        this.data.isImageLoad = true;
      }
    }
  }
})
