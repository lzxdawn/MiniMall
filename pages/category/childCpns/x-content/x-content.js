// pages/category/childCpns/x-content/x-content.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    subcategories: {
      type: Array
    },
    categoryDetail: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabClick(e) {
      const currentIndex = e.detail
      this.setData({
        currentIndex
      })
      this.triggerEvent('contenttab', {currentIndex})
    }
  }
})
