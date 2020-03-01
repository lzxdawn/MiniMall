// components/x-goods-item/x-goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick() {
      const iid = this.data.item.iid;
      const item_id = this.data.item.item_id
      wx.navigateTo({
        url: `/pages/detail/detail?iid=${iid || item_id}` 
      })
    }
  }
})
