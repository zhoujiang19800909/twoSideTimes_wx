// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:"",
    avatarUrl:""
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '我的'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#825353'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        that.setData({
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
        })
      }
    })
  },
  bitphone:function(){
    wx.makePhoneCall({
      phoneNumber: '1340000' 
    })
  },
  toChief:function(){
    wx.navigateTo({
      url: '../mine/chef/chef',
    })
  },
  toWaiter: function () {
    wx.navigateTo({
      url: '../mine/waiter/waiter',
    })
  },
  toService: function () {
    wx.navigateTo({
      url: '../mine/service/service',
    })
  },
  toManager: function () {
    wx.navigateTo({
      url: '../mine/manager/manager',
    })
  },
 

 
})