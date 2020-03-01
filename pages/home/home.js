// pages/home/home.js
import { getMultiData, getGoodsData} from '../../service/home.js'
import { POP, NEW, SELL, BACK_TOP_POSITION} from '../../common/const.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      [POP]: { page: 0, list: [] },
      [NEW]: { page: 0, list: [] },
      [SELL]: { page: 0, list: [] }
    },
    currentType: POP,
    showBackTop: false,
    isTabFiexd: false,
    tabScrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this._getMultiData();
    this._getGoodsData(POP);
    this._getGoodsData(NEW);
   this._getGoodsData(SELL);
  },
  //----------------网络请求函数------------------
  _getMultiData() {
    getMultiData().then(res => {
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      this.setData({
        banners,
        recommends
      })
    })
  },
  _getGoodsData(type) {
    const page = this.data.goods[type].page + 1;
    getGoodsData(type, page).then(res => {
      const list = res.data.data.list
      const oldList = this.data.goods[type].list;
      oldList.push(...list)
      const typeKey = `goods.${type}.list`;
      const pageKey = `goods.${type}.page`;
      this.setData({
        [typeKey]: oldList,
        [pageKey]: page
      })
    })
  },
  //-----------------事件监听函数-----------------
  //tab-control点击事件
  handleTabClick(e) {
    //取出index
    const index = e.detail
    const type = [POP, NEW, SELL]
    this.setData({
      currentType: type[index]
    })
  },
  //获取tab-control距离顶部距离
  handleImageLoad() {
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      this.data.tabScrollTop = rect.top
    }).exec();
  },
  //上拉加载
  onReachBottom() {
    this._getGoodsData(this.data.currentType)
  },
  //控制back-top组件的是否显示
  onPageScroll(options) {
    const scrollTop = options.scrollTop;
    const flag1 = scrollTop > BACK_TOP_POSITION
    if (flag1 != this.data.showBackTop ) {
      this.setData({
        showBackTop: flag1
      })
    }
    const flag2 = scrollTop >= this.data.tabScrollTop 
    if (flag2 != this.data.isTabFiexd) {
      this.setData({
        isTabFiexd: flag2
      })
    }
  }
})