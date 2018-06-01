const util = require('../../../utils/util')
var app = getApp()

// pages/order/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex:1,
    orderTime:'17:00',
    validityDates:[],
    validityDatesView:[],
    validityDateIndex:0,//TODO 默认为1 当天
    orderList:[],
    orderSts:{},
    hasOrder:true
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '我是客服'
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
    wx.setStorageSync('validityDate', this.data.validityDates[this.data.validityDateIndex]);
    this.setData({ validityDates, validityDatesView})

    //获取预约订单
    this.getServiceOrderList();
    //获取预约订单
    this.getServiceOrderSts();

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
  //选择预约日期
  selvalidityDate: function (e){
    // console.log("selvalidityDate",e);
    this.setData({ validityDateIndex:e.detail.value})

    //获取预约订单
    this.getServiceOrderList();
    //获取预约订单统计
    this.getServiceOrderSts();

  },
  //获取订单信息
  getServiceOrderList: function (){
    var that = this;
    var validityDateUrl = '&validityDate=' + this.data.validityDatesView[this.data.validityDateIndex];
    if (this.data.validityDateIndex == 0){
      validityDateUrl = '&validityDate=all';
    }
    
    util.doGet(app.globalData.server + '/getServiceOrderList?session=' + wx.getStorageSync('third_session') + validityDateUrl, function (res) {
      that.setData({ orderList:res.data})
    });

  },
  //获取订单统计信息
  getServiceOrderSts: function () {
    var that = this;
    var validityDateUrl = '&validityDate=' + this.data.validityDatesView[this.data.validityDateIndex];
    if (this.data.validityDateIndex == 0) {
      validityDateUrl = '&validityDate=all';
    }
    util.doGet(app.globalData.server + '/getOrderSts?session=' + wx.getStorageSync('third_session') + validityDateUrl, function (res) {
      that.setData({ orderSts: res.data })
      console.log("getServiceOrderSts",that.data.orderSts)
    });

  },
  //确认订单
  doAccept: function (e){
    var that = this;
    var orderId = e.currentTarget.dataset.item.id;
    var orderNo = e.currentTarget.dataset.item.name;
    var orderLine = e.currentTarget.dataset.item.order_line;
    wx.request({
      url: app.globalData.server + '/changeOrderStatus?session=' + wx.getStorageSync('third_session'),
      method: 'POST',
      data: { orderId: orderId, status: '2', orderNo: orderNo, orderLine: orderLine },//已确认
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        that.getServiceOrderList();
        that.getServiceOrderSts();
        wx.showToast({
          title: '成功确认',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  //取消订单
  doCancel: function (e) {
    var that = this;
    console.log(e.currentTarget.dataset)
    var orderId = e.currentTarget.dataset.item.id;
    var orderNo = e.currentTarget.dataset.item.name;
    wx.request({
      url: app.globalData.server + '/changeOrderStatus?session=' + wx.getStorageSync('third_session'),
      method: 'POST',
      data: { orderId: orderId, status: '7', orderNo: orderNo },//已取消
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        that.getServiceOrderList();
        that.getServiceOrderSts();
        wx.showToast({
          title: '成功取消',
          icon: 'success',
          duration: 2000
        })
      }
    })

  },
  //选择订单日期
  selOrderTime: function (e){
    this.setData({
      orderTime: e.detail.value
    })
  },
  //上滑顶部刷新
  scrolltoupper: function(e){
    console.log("scrolltoupper");

    //获取预约订单
    this.getServiceOrderList();
    //获取预约订单统计
    this.getServiceOrderSts();


  }

})