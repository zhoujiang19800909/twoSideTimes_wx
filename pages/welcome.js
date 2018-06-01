const util = require('../utils/util')
var app = getApp()

// pages/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录并生成session
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        util.doGet(app.globalData.server + '/getSession?code=' + res.code, function (res) {
          console.log("third_session", res.data.third_session);
          wx.setStorageSync('third_session', res.data.third_session);
          util.doGet(app.globalData.server + '/getOrders?session=' + wx.getStorageSync('third_session'), function (res1) {
            wx.switchTab({
              url: 'order/list/list',
            })
            console.log('orderList', res1.data)


            wx.setStorageSync('orderList', res1.data)
          });

        });

      }
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