// pages/mine/mine.js
const util = require('../../utils/util')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName:"",
    avatarUrl:"",
    showService:false,
    showChef:false,
    showWaiter:false,
    showManager:false
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
        console.log("userInfo", userInfo);

        that.setData({
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
        })
      }
    })
    //获取用户信息
    util.doGet(app.globalData.server + '/getUserByOpenid?session=' + wx.getStorageSync('third_session'), function (res) {
      var groupids =  res.data.user.groups_id;
      // console.log("groupids", groupids)
      for(var i in groupids){
        // console.log("groupid", groupids[i])
        var groupid = groupids[i]
        //客服角色ID 96
        if (groupid == '96'){
          that.setData({ showService:true});
        }
        //廚師角色ID 97
        if (groupid == '97') {
          that.setData({ showChef: true });
        }
        //店員角色ID 98
        if (groupid == '98') {
          that.setData({ showWaiter: true });
        }

      }

      
    })
  },
  bitphone:function(){
    wx.makePhoneCall({
      phoneNumber: '1340000' 
    })
  },
  toChef:function(){
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