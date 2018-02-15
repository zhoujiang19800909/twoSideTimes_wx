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
    orderDateIndex:0,
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

    var orderDate = [];
    var orderDateView = [];
    for (var i = 0; i < 5; i++) {
      orderDate[i] = new Date(monday);
      orderDate[i].setDate(orderDate[i].getDate() + i);
      orderDateView[i] = util.formatDate(orderDate[i])
    }

    this.setData({ orderDate, orderDateView})

    //获取预约订单
    this.getMyBooks('userId');

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
  selorderDate: function (e){
    // console.log("selorderDate",e);
    this.setData({ orderDatesIndex:e.detail.value})

  },
  //获取订单信息
  getMyBooks: function (usrId){
    var that = this;
    util.doGet(app.globalData.server + '/getOrderList', function (res) {
      that.setData({ orderList:res.data})
    });

  },
  //获取订单详细信息
  selOrderDetail: function (orderNo){
    var that = this;
    util.doGet(app.globalData.server + '/getOrderDetail', function (res) {
      console.log("selOrderDetail",res.data);
      wx.setStorageSync('orderNo', res.data.orderNo);
      wx.setStorageSync('createTime', res.data.createTime);
      wx.setStorageSync('orderDate', res.data.orderDate);
      wx.setStorageSync('cartList', res.data.cartList);
      wx.setStorageSync('sumMonney', res.data.sumMonney);
      wx.setStorageSync('cupNumber', res.data.cupNumber);
      wx.setStorageSync('takeNo', res.data.takeNo);
      wx.navigateTo({
        url: '../detail/detail'
      })

    });

  },
  selOrderTime: function (e){
    this.setData({
      orderTime: e.detail.value
    })
  }
})