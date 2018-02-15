// pages/order/balance/balance.js
var app = getApp()
const util = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderTime: null,
    cartList: [],
    sumMonney: 0,
    cutMonney: 0,
    cupNumber:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    this.setData({
      orderTime: util.formatDate(wx.getStorageSync('orderTime')),
      cartList: wx.getStorageSync('cartList'),
      sumMonney: wx.getStorageSync('sumMonney'),
      cutMonney: wx.getStorageSync('sumMonney')>19?3:0,
      cupNumber: wx.getStorageSync('cupNumber'),
    })
    
  },
  gopay:function(){
    wx.setStorageSync('takeNo', 'CD0201')
    wx.navigateTo({
      url: '../detail/detail'
    })
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