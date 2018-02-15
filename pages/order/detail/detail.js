// pages/order/detail/detail.js
const util = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNo:null,
    createTime:new Date(),
    orderTime:new Date(),
    cartList: [],
    sumMonney: 0,
    cutMonney: 0,
    cupNumber: 0,
    wxaqrCode:null,
    takeNo:null,
    takeNoList:['1','2','3','4','5','6']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情'
    });
    var takeNo = wx.getStorageSync('takeNo');
    var takeNoList = ['','','','','',''];

    takeNoList[0] = takeNo.substring(0,1);
    takeNoList[1] = takeNo.substring(1, 2);
    takeNoList[2] = takeNo.substring(2, 3);
    takeNoList[3] = takeNo.substring(3, 4);
    takeNoList[4] = takeNo.substring(4, 5);
    takeNoList[5] = takeNo.substring(5, 6);

    this.setData({
      orderTime: util.formatDate(wx.getStorageSync('orderTime')),
      cartList: wx.getStorageSync('cartList'),
      sumMonney: wx.getStorageSync('sumMonney'),
      // cutMonney: wx.getStorageSync('sumMonney') > 19 ? 3 : 0,
      cupNumber: wx.getStorageSync('cupNumber'),
      orderNo: wx.getStorageSync('orderNo'),
      createTime: wx.getStorageSync('createTime'),
      takeNo: takeNo,
      takeNoList: takeNoList
    });
    console.log(this.data);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    //生成二维码
    //参考 http://blog.csdn.net/qingchen1016/article/details/54929967
    // appid = wx0c968d297f10614b secret= c37e47687189473eebe7d3459aa5a0b3
    util.doPost(
      "https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=6_pHY_hj08Fkq-hrDVTI_PDvsXOW6PTcrLLfPStg5UBqT9zzBF0piPxa0eCRuYWpHrVQr_cpAS7aJKPOX0mtZCtN7zNZn5XjfYjYehxuIGCoTuVUFXvLYF2xF-vF1sJMxH-Dr37ch_5kbDnrs_STVhAHAZAC",
      {"path": "pages/list/list", "width": 430},
      function(res){
        console.log("getQRCODE:",res);
        that.setData({ wxaqrCode: res.data});
        //UNDO 这个吊二维码数据怎么显示？
        //xhr.overrideMimeType('text/xml; charset=x-user-defined');
        // console.log(that.data.wxaqrCode)
      }
    );
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})