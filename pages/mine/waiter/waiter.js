// pages/mine/waiter/waiter.js

const util = require('../../../utils/util')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex:1,
    orderTime:'17:00',
    validityDates:[],
    validityDatesView:[],
    validityDateIndex:0,//TODO 默认当天1
    orderList:[],
    orderSts:{},
    hasOrder:true
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '我是店员'
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
    //计算预约时间范围 
    //当天开始7天内
    var currDate = new Date(); //当天
    var nowDay = new Date().getDay();

    var validityDates = [];
    var validityDatesView = [];
    validityDates[0] = 'all';
    validityDatesView[0] = '全部';
    for (var i = 1; i < 8; i++) {
      validityDates[i] = new Date(currDate);
      validityDates[i].setDate(validityDates[i].getDate() + i - 1);
      validityDatesView[i] = util.formatDate(validityDates[i])
    }
    this.setData({ validityDates, validityDatesView})

    //获取预约订单
    this.getWaiterOrderList();
    //获取预约订单
    this.getWaiterOrderSts();

  },

  changeTab:function(e){
    var index = e.currentTarget.dataset.index
    this.setData({
      tabIndex: index,
    })

    
  },
  golist: function () {
    // wx.setStorageSync('validityDate', this.data.validityDate[this.data.validityDateIndex]);

    wx.navigateTo({
      url: '../../find/foods/foods'
    })
  },
  selvalidityDate: function (e){
    // console.log("selvalidityDate",e);
    this.setData({ validityDateIndex:e.detail.value})

    //获取预约订单
    this.getWaiterOrderList();
    //获取预约订单
    this.getWaiterOrderSts();
  },
  //获取订单信息
  getWaiterOrderList: function (){
    var that = this;
    var validityDateUrl = '&validityDate=' + this.data.validityDatesView[this.data.validityDateIndex];
    if (this.data.validityDateIndex == 0) {
      validityDateUrl = '&validityDate=all';
    }
    util.doGet(app.globalData.server + '/getWaiterOrderList?session=' + wx.getStorageSync('third_session') + validityDateUrl, function (res) {
      that.setData({ orderList:res.data})
    });

  },
  //获取订单统计信息
  getWaiterOrderSts: function () {
    var that = this;
    var validityDateUrl = '&validityDate=' + this.data.validityDatesView[this.data.validityDateIndex];
    if (this.data.validityDateIndex == 0) {
      validityDateUrl = '&validityDate=all';
    }
    util.doGet(app.globalData.server + '/getOrderSts?session=' + wx.getStorageSync('third_session') + validityDateUrl, function (res) {
      that.setData({ orderSts: res.data })
    });

  },
  //选择预约日期
  selOrderTime: function (e){
    this.setData({
      orderTime: e.detail.value
    })
  },
  //确认取餐
  doTake: function (e) {
    var that = this;
    var orderId = e.currentTarget.dataset.item.id;
    var orderNo = e.currentTarget.dataset.item.name;
    wx.request({
      url: app.globalData.server + '/changeOrderStatus?session=' + wx.getStorageSync('third_session'),
      method: 'POST',
      data: { orderId: orderId, status: '5', orderNo: orderNo },//已确认
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        that.getWaiterOrderList();
        that.getWaiterOrderSts();
        wx.showToast({
          title: '成功确认',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  //上滑顶部刷新
  scrolltoupper: function (e) {
    console.log("scrolltoupper");

    //获取预约订单
    this.getWaiterOrderList();
    //获取预约订单统计
    this.getWaiterOrderSts();


  }
})