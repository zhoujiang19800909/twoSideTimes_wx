const util = require('../../../utils/util')
var app = getApp()

// pages/order/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex:1,
    takeTime:new Date(),
    validityTime: '17:00',
    validityDates:[],
    validityDatesView:[],
    validityDateIndex:0,
    orderList:[],
    hasOrder:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //计算预约时间范围 
    //下一周的周一至周五 暂不考虑假日
    var currDate = new Date(); //当天
    var nowDay = new Date().getDay();
    var monday = new Date(currDate);//下周一
    monday.setDate(currDate.getDate() - nowDay + 1 + 7);

    var validityDates = [];
    var validityDatesView = [];
    for (var i = 0; i < 5; i++) {
      validityDates[i] = new Date(monday);
      validityDates[i].setDate(validityDates[i].getDate() + i);
      validityDatesView[i] = util.formatDate(validityDates[i])
    }

    this.setData({ validityDates, validityDatesView})

    // var takeTime = this.data.validityDatesView[this.data.validityDateIndex] + ' ' + this.data.validityTime + ':00';
    // this.setData({ takeTime: new Date(takeTime)})


    //获取预约订单 延时0.5秒 等待app.js中获取后台数据
    var that = this;
    // console.log("setTimeout", wx.getStorageSync('orderList'));
    that.setData({ orderList: wx.getStorageSync('orderList') });
    

  },

  changeTab:function(e){
    var index = e.currentTarget.dataset.index
    this.setData({
      tabIndex: index,
    })

    
  },
  golist: function () {
    var takeTime = this.data.validityDatesView[this.data.validityDateIndex] + ' ' + this.data.validityTime+':00';
    console.log('takeTime', new Date(takeTime))
    wx.setStorageSync('takeTime', takeTime);
    wx.setStorageSync('validityDate', this.data.validityDatesView[this.data.validityDateIndex]);

    wx.navigateTo({
      url: '../../find/foods/foods'
    })
  },
  selValidityDate: function (e){
    console.log("selvalidityDate",e);
    this.setData({ validityDateIndex:e.detail.value})

  },
  // //获取订单信息
  // getMyBooks: function (usrId){
  //   var that = this;
  //   var session = wx.getStorageSync('third_session');
  //   util.doGet(app.globalData.server + '/getOrders?session=' + session, function (res) {
  //     that.setData({ orderList:res.data})
  //   });
  // },
  //获取订单详细信息
  selOrderDetail: function (e){
    var detailId = e.currentTarget.dataset.item.id;

    var that = this;
    util.doGet(app.globalData.server + '/getOrderDetail?session=' + wx.getStorageSync('third_session')+'&id='+detailId, function (res) {
      console.log("selOrderDetail",res.data);
      wx.setStorageSync('detail', res.data);
      wx.setStorageSync('orderId', res.data.id);
      wx.setStorageSync('orderNo', res.data.orderNo);
      wx.setStorageSync('createTime', res.data.createTime);
      // wx.setStorageSync('validityDate', that.data.validityDates[this.data.validityDateIndex]);
      wx.setStorageSync('takeTime', res.data.takeTime);
      wx.setStorageSync('cartList', res.data.cartList);
      wx.setStorageSync('sumMonney', res.data.sumMonney);
      wx.setStorageSync('cupNumber', res.data.cupNumber);
      wx.setStorageSync('takeNo', res.data.takeNo);
      wx.setStorageSync('status', res.data.status);
      wx.navigateTo({
        url: '../detail/detail'
      })

    });

  },
  selValidityTime: function (e){
    this.setData({
      validityTime: e.detail.value
    })
  },
  scroll: function(e){
    var that = this;
    util.doGet(app.globalData.server + '/getOrders?session=' + wx.getStorageSync('third_session'), function (res) {
      console.log('orderList', res.data)
      wx.setStorageSync('orderList', res.data)
      that.setData({ orderList: wx.getStorageSync('orderList') });
    });

  }
})