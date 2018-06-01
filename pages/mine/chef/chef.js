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
    foodSts:{},
    validityDates:[],
    validityDatesView:[],
    validityDateIndex: 0,//TODO 默认为1 当天
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

    //计算预约时间范围 
    //当天开始7天内
    // var currDate = new Date(); //当天
    // var nowDay = new Date().getDay();

    // var validityDates = [];
    // var validityDatesView = [];
    // validityDates[0] = 'all';
    // validityDatesView[0] = '全部';
    // for (var i = 1; i < 8; i++) {
    //   validityDates[i] = new Date(currDate);
    //   validityDates[i].setDate(validityDates[i].getDate() + i - 1);
    //   validityDatesView[i] = util.formatDate(validityDates[i])
    // }
    wx.setStorageSync('validityDate', this.data.validityDates[this.data.validityDateIndex]);
    // this.setData({ validityDates, validityDatesView })

    //获取待制作的日期，放入取餐日期列表中
    this.getChefValidityDates();

    //获取列表数据
    this.getChefOrderList();
    this.getChefOrderLineSts();
    
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
  //选择预约日期
  selValidityDate: function (e) {
    console.log("selvalidityDate",this.data.validityDates,this.data.validityDatesView);
    this.setData({ validityDateIndex: e.detail.value })

    //获取预约订单
    this.getChefOrderList();
    //获取预约订单统计
    this.getChefOrderLineSts();

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
  //获取取餐日期
  getChefValidityDates: function(e){
    var that = this;
    util.doGet(app.globalData.server + '/getChefValidityDates', function (res) {
      console.log("res.length:::",res.data.length);
      var validityDates = res.data;
      var validityDatesView = [];
      validityDatesView[0] = '全部';
      for (var i = 1; i < res.data.length; i++) {
        validityDatesView[i] = res.data[i]
      }
      that.setData({ validityDates,validityDatesView })
    });


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
  getChefOrderList:function(){
    var that = this;
    var validityDateUrl = '?validityDate=' + this.data.validityDatesView[this.data.validityDateIndex];
    if (this.data.validityDateIndex == 0) {
      validityDateUrl = '?validityDate=all';
    }

    //将本来的后台换成了easy-mock 的接口，所有数据一次请求完 略大。。
    util.doGet(app.globalData.server + '/getChefOrderList' + validityDateUrl, function (res) {
      wx.hideLoading();
      console.log(res)
      that.setData({
        listData: res.data,
        loading: true
      })
    });

  },
  //获取订单统计信息
  getChefOrderLineSts: function () {
    var that = this;
    var validityDateUrl = '?validityDate=' + this.data.validityDatesView[this.data.validityDateIndex];
    if (this.data.validityDateIndex == 0) {
      validityDateUrl = '?validityDate=all';
    }
    util.doGet(app.globalData.server + '/getOrderLineSts' + validityDateUrl, function (res) {
      that.setData({ foodSts: res.data })
    });

  },
  // 单个确认
  singleDone: function(e) {
    console.log("singleDone", e.currentTarget.dataset.item);
    var item = e.currentTarget.dataset.item;
    var that = this;
    wx.request({
      url: app.globalData.server + '/changeOrderLineStatus?session=' + wx.getStorageSync('third_session'),
      method: 'POST',
      data: { orderId: item.order_id[0], status: '3', lineId: item.id },//已确认
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        //获取列表数据
        that.getChefOrderList();
        that.getChefOrderLineSts();

        wx.showToast({
          title: '制作完成',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  // 批量确认
  batchDone: function (e) {
    console.log("batchDone", e.currentTarget.dataset.lines);
    var that = this;

    var lines = e.currentTarget.dataset.lines;
    for(var line in lines){
      console.log(line)
      wx.request({
        url: app.globalData.server + '/changeOrderLineStatus?session=' + wx.getStorageSync('third_session'),
        method: 'POST',
        data: { orderId: lines[line].order_id[0], status: '3', lineId: lines[line].id },//已确认
        header: {
          'Accept': 'application/json'
        },
        success: function (res) {
          //获取列表数据
          that.getChefOrderList();
          that.getChefOrderLineSts();

          wx.showToast({
            title: '制作完成',
            icon: 'success',
            duration: 2000
          })
        }
      })
    } 
    
  }
})