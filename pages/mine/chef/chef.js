// pages/list/list.js
const util = require('../../../utils/util')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    activeIndex: 0,
    toView: 'a0',
    scrollTop: 100,
    screenWidth: 667,
    showModalStatus: false,
    currentType: 0,
    currentIndex: 0,
    cartList: [],
    sumMonney: 0,
    cupNumber: 0,
    showCart: false,
    loading: false,
    foodSts:{}
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '我是主厨'
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
    var that = this;
    var sysinfo = wx.getSystemInfoSync().windowHeight;
    console.log("sysinfo", sysinfo)
    wx.showLoading({
      title: '努力加载中',
    })
    this.getChefOrderSts();
    //将本来的后台换成了easy-mock 的接口，所有数据一次请求完 略大。。
    util.doGet(app.globalData.server + '/getChefOrders', function (res) {
      wx.hideLoading();
      console.log(res)
      that.setData({
        listData: res.data,
        loading: true
      })
    });
  },
  selectMenu: function (e) {
    var index = e.currentTarget.dataset.index
    console.log("selectMenu", index)
    this.setData({
      activeIndex: index,
      toView: 'a' + index,
      // scrollTop: 1186
    })
    console.log("this.data.toView", this.data.toView);
  },
  scroll: function (e) {
    // console.log("scroll ",e)
    var dis = e.detail.scrollTop
    if (dis > 0 && dis < 1189) {
      this.setData({
        activeIndex: 0,
      })
    }
    if (dis > 1189 && dis < 1867) {
      this.setData({
        activeIndex: 1,
      })
    }
    if (dis > 1867 && dis < 2180) {
      this.setData({
        activeIndex: 2,
      })
    }
    if (dis > 2180 && dis < 2785) {
      this.setData({
        activeIndex: 3,
      })
    }
    if (dis > 2785 && dis < 2879) {
      this.setData({
        activeIndex: 4,
      })
    }
    if (dis > 2879 && dis < 4287) {
      this.setData({
        activeIndex: 5,
      })
    }
    if (dis > 4287 && dis < 4454) {
      this.setData({
        activeIndex: 6,
      })
    }
    if (dis > 4454 && dis < 4986) {
      this.setData({
        activeIndex: 7,
      })
    }
    if (dis > 4986) {
      this.setData({
        activeIndex: 8,
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  selectInfo: function (e) {
    var type = e.currentTarget.dataset.type;
    var index = e.currentTarget.dataset.index;
    console.log("selectInfo type ", type, "index ", index);
    this.setData({
      // showModalStatus: !this.data.showModalStatus, // 直接加入购物车不显示弹框
      currentType: type,
      currentIndex: index
    });
    //直接加入购物车
    // this.addToCart();
  },
  selfood: function(e){
    // console.log("selfood", e.currentTarget.id);
    var currentId = e.currentTarget.id;
    var list = this.data.listData;
    // console.log("selfood", list);
    list.forEach(function(item,i){
      item.foods.forEach(function (food, j) {
        if (food.foodId == currentId){
          console.log(food + '---' + food.name);
          food.open = !food.open;
        }
      });
    });
    this.setData({ listData: list});
  },
  //获取订单统计信息
  getChefOrderSts: function () {
    var that = this;
    util.doGet(app.globalData.server + '/getChefOrderSts', function (res) {
      that.setData({ foodSts: res.data })
    });

  },
})