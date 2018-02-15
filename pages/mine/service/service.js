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
    orderDate:[],
    orderDateView:[],
    orderDateIndex:1,
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

    var orderDate = [];
    var orderDateView = [];
    orderDate[0] = 'all';
    orderDateView[0] = '全部';
    for (var i = 1; i < 8; i++) {
      orderDate[i] = new Date(currDate);
      orderDate[i].setDate(orderDate[i].getDate() + i - 1);
      orderDateView[i] = util.formatDate(orderDate[i])
    }
    this.setData({ orderDate, orderDateView})

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
    wx.setStorageSync('orderDate', this.data.orderDate[this.data.orderDateIndex]);

    wx.navigateTo({
      url: '../../find/foods/foods'
    })
  },
  selOrderDate: function (e){
    // console.log("selorderDate",e);
    this.setData({ orderDateIndex:e.detail.value})
  },
  //获取订单信息
  getServiceOrderList: function (){
    var that = this;
    util.doGet(app.globalData.server + '/getServiceOrderList', function (res) {
      that.setData({ orderList:res.data})
    });

  },
  //获取订单统计信息
  getServiceOrderSts: function () {
    var that = this;
    util.doGet(app.globalData.server + '/getServiceOrderSts', function (res) {
      that.setData({ orderSts: res.data })
    });

  },
  selOrderTime: function (e){
    this.setData({
      orderTime: e.detail.value
    })
  }
})