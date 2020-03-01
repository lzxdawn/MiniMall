// pages/category/category.js
import { getCategory, 
         getSubcategory,
         getCategoryDetail
} from '../../service/category.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    categoryData: {},
    currentIndex: 0,
    typeIndex: 0,
    type: ['pop', 'new', 'sell'],
    miniWallKey: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getCategory();
  },
  //----------------网络请求函数------------------
  _getCategory() {
    getCategory().then(res => {
      const category = res.data.data.category
      const categories = category.list
      const categoryData = {}
      for (let i = 0; i < categories.length; i++) {
        categoryData[i] = {
          subcategories: [],
          categoryDetail: []
        }
      }
      this.setData({
        categories,
        categoryData
      })
      //请求第一个类别数据
      this._getSubcategory(0)
      //请求第一个类别的详情数据
      this._getCategoryDetail(0)

    })
  },
  _getSubcategory(currentIndex) {
    const maitKey = this.data.categories[currentIndex].maitKey;
    getSubcategory(maitKey).then(res => {
      const tempCategoryData = this.data.categoryData;
      tempCategoryData[currentIndex].subcategories = res.data.data.list;
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },

  _getCategoryDetail(currentIndex) {
    const miniWallKey = this.data.categories[currentIndex].miniWallkey
    this.setData({
      miniWallKey
    })
    const type = this.data.type
    const typeIndex = this.data.typeIndex
    this._getRealCategoryDetail(currentIndex, miniWallKey, type[typeIndex])
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'new');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'sell');
  },
  _getRealCategoryDetail(index, miniWallKey, type) {
    getCategoryDetail(miniWallKey, type).then(res => {
      const categoryData = this.data.categoryData
      categoryData[index].categoryDetail = res.data;
      this.setData({
        categoryData
      })
    })
  },

  //---------------事件监听函数------------------
  handleMenuClick(e) {
    const currentIndex = e.detail.currentIndex
    this.setData({
      currentIndex
    })
    // 请求对应currentIndex的数据
    this._getSubcategory(currentIndex);

    // 请求对应的currentIndex的详情数据
    this._getCategoryDetail(currentIndex)
  },
  contentTabClick(e) {
    this.setData({
      typeIndex: e.detail.currentIndex
    })
    const type = this.data.type
    const typeIndex = this.data.typeIndex
    const currentIndex = this.data.currentIndex
    const miniWallKey = this.data.miniWallKey
    this._getRealCategoryDetail(currentIndex, miniWallKey, type[typeIndex])
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})