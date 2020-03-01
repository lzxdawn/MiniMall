// pages/category/childCpns/x-menu/x-menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    categories: {
      type: Array,
      value: []
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
    menuItemClick(e) {
      const currentIndex = e.currentTarget.dataset.index;
      this.setData({
        currentIndex
      })

      this.triggerEvent('menuclick', {currentIndex}, {})
    }
  }
})
