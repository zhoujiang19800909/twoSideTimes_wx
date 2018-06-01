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
    cupNumber:0,
    showCart: false,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var sysinfo = wx.getSystemInfoSync().windowHeight;
    console.log("sysinfo",sysinfo)
    wx.showLoading({
      title: '努力加载中',
    })
    var validityDate = wx.getStorageSync('validityDate');
    //将本来的后台换成了easy-mock 的接口，所有数据一次请求完 略大。。
    util.doGet(app.globalData.server + '/getFoods?validityDate='+validityDate,function(res){
      wx.hideLoading();
      console.log("getFoods---->",res)
      that.setData({
        listData: res.data,
        loading: true
      })
    });
  },
  selectMenu: function (e) {
    var index = e.currentTarget.dataset.index
    console.log("selectMenu",index)
    this.setData({
      activeIndex: index,
      toView: 'a' + index,
      // scrollTop: 1186
    })
    console.log("this.data.toView",this.data.toView);
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
    // console.log("selectInfo type ",type,"index ",index);
    this.setData({
      // showModalStatus: !this.data.showModalStatus, // 直接加入购物车不显示弹框
      currentType: type,
      currentIndex: index
    });
    //直接加入购物车
    this.addToCart();
  },

  addToCart: function () {
    var a = this.data;
    // var cartList = this.data.cartList;

    //计算可定数量
    var leftNumber = a.listData[a.currentType].foods[a.currentIndex].leftNumber;
    //可定数量小于1不可预定
    if (leftNumber > 0) {
      a.listData[a.currentType].foods[a.currentIndex].leftNumber = leftNumber - 1;
      var currName = a.listData[a.currentType].foods[a.currentIndex].name;
      var cnt = 0;
      var price = a.listData[a.currentType].foods[a.currentIndex].list_price
      if (a.listData[a.currentType].foods[a.currentIndex].cnt){
        cnt = a.listData[a.currentType].foods[a.currentIndex].cnt;
      }
      cnt = cnt + 1;
      console.log("currName", currName,cnt);
      a.listData[a.currentType].foods[a.currentIndex].cnt = cnt;
      a.listData[a.currentType].foods[a.currentIndex].sum = cnt * price;

      


      
      var sumMonney = a.sumMonney + a.listData[a.currentType].foods[a.currentIndex].list_price;

      console.log("addToCart", a.listData);

      var cartList = [];
      var k = 0;
      for (var i = 0; i < a.listData.length;i++){
        // console.log("listData", a.listData[i]);
        for (var j = 0; j < a.listData[i].foods.length; j++){
          if (a.listData[i].foods[j].cnt){
            console.log(a.listData[i].foods[j].name, a.listData[i].foods[j].cnt);
            cartList[k] = a.listData[i].foods[j];
            k++;
          }
        }

      }
      
      
      this.setData({
        listData: a.listData,
        cartList: cartList,
        showModalStatus: false,
        sumMonney: sumMonney,
        cupNumber: a.cupNumber + 1
      });
      console.log("addToCart ",this.data.cartList)
    }
  },
  showCartList: function () {
    console.log("showCartList",this.data.showCart)
    if (this.data.cartList.length != 0) {
      this.setData({
        showCart: !this.data.showCart,
      });
    }

  },
  clearCartList: function () {
    this.setData({
      cartList: [],
      showCart: false,
      sumMonney: 0
    });
  },
  addNumber: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var cartList = this.data.cartList;
    cartList[index].number++;
    var sum = this.data.sumMonney + cartList[index].list_price;
    cartList[index].sum += cartList[index].list_price;

    this.setData({
      cartList: cartList,
      sumMonney: sum,
      cupNumber: this.data.cupNumber+1
    });
  },
  decNumber: function (e) {
    var index = e.currentTarget.dataset.index;
    console.log("decNumber ",index)
    var cartList = this.data.cartList;

    var sum = this.data.sumMonney - cartList[index].list_price;
    cartList[index].sum -= cartList[index].list_price;
    cartList[index].number == 1 ? cartList.splice(index, 1) : cartList[index].number--;
    this.setData({
      cartList: cartList,
      sumMonney: sum,
      showCart: cartList.length == 0 ? false : true,
      cupNumber: this.data.cupNumber-1
    });
  },
  goBalance: function () {
    if (this.data.sumMonney != 0) {
      wx.setStorageSync('cartList', this.data.cartList);
      wx.setStorageSync('sumMonney', this.data.sumMonney);
      wx.setStorageSync('cupNumber', this.data.cupNumber);
      wx.setStorageSync('createTime', new Date(), );


      wx.navigateTo({
        url: '../../order/balance/balance'
      })
    }
  }
})