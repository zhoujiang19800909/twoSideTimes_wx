// pages/order/balance/balance.js
var app = getApp()
const util = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    validityDate: null,
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
      validityDate: wx.getStorageSync('validityDate'),
      takeTime: wx.getStorageSync('takeTime'),
      cartList: wx.getStorageSync('cartList'),
      sumMonney: wx.getStorageSync('sumMonney'),
      // cutMonney: wx.getStorageSync('sumMonney')>19?3:0,
      cupNumber: wx.getStorageSync('cupNumber'),
    })
    
  },
  //完成支付后调用
  gopay:function(){

    

    var that = this;
    console.log("gopay",that.data.cartList);
    wx.request({
      url: app.globalData.server + '/createOrder?session=' + wx.getStorageSync('third_session'),
      method: 'POST',
      data: that.data,
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log("created Order ID is ", res.data)
        wx.setStorageSync('orderId', res.data.orderId);
        wx.setStorageSync('takeNo', res.data.takeNo)
        wx.setStorageSync('orderNo', res.data.orderNo); 

        wx.navigateTo({
          url: '../detail/detail'
        })
        // orderId
      }
    })
  }
})