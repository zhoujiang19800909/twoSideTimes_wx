// pages/order/detail/detail.js
const util = require('../../../utils/util')

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scene:null,
    orderId:null,
    orderNo:null,
    createTime:new Date(),
    takeTime:new Date(),
    cartList: [],
    sumMonney: 0,
    cutMonney: 0,
    cupNumber: 0,
    wxaqrCode:null,
    takeNo:null,
    takeNoList:['1','2','3','4','5','6'],//UNDO
    canCancel:false   //UNDO 可以申请取消
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var scene = decodeURIComponent(options.scene)
    this.setData({ scene})

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

    console.log("detail",wx.getStorageSync('detail'));
    var detail = wx.getStorageSync('detail');
    

    this.setData({
      takeTime: wx.getStorageSync('takeTime'),
      cartList: wx.getStorageSync('cartList'),
      sumMonney: wx.getStorageSync('sumMonney'),
      // cutMonney: wx.getStorageSync('sumMonney') > 19 ? 3 : 0,
      cupNumber: wx.getStorageSync('cupNumber'),
      orderId: wx.getStorageSync('orderId'),
      orderNo: wx.getStorageSync('orderNo'),
      createTime: wx.getStorageSync('createTime'),
      takeNo: takeNo,
      takeNoList: takeNoList
    });
    //TODO 已提交且距离预约日2天内可以申请取消
    if (detail.status=='1'){
      console.log("detail.status")
      this.setData({canCancel: true})
    }
    console.log(this.data);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    //生成二维码
    // 参考 https://www.w3cschool.cn/weixinapp/weixinapp-api-qrcode.html
    //参考 http://blog.csdn.net/qingchen1016/article/details/54929967
    //https://mp.weixin.qq.com/debug/cgi-bin/apiinfo?t=index&type=%E5%9F%BA%E7%A1%80%E6%94%AF%E6%8C%81&form=%E8%8E%B7%E5%8F%96access_token%E6%8E%A5%E5%8F%A3%20/token
    // appid = wx0c968d297f10614b secret= c37e47687189473eebe7d3459aa5a0b3
    var access_token = "8_k2hKD2Q0wAlYmD8gSmNPnpsJLz7jm5bbV0MuyGd2jQDoQzpEdqITkbTDRlzBOlxincKJnuqWTBvvyVoJ5ojnvz4PCo2FLVeXO_iJA-KxNGqVNpuQKAEYlPSOBM_kLBJPa_AsLFTVaArOu0sFCBBbAJAWVV";

    wx.request({
      

      // url: "https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token="+access_token,
      // url: "https://api.weixin.qq.com/wxa/getwxacode?access_token="+access_token,
      url: "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=" + access_token,
      method: 'POST',
      // data: { "path": "pages/welcome", "width": 430 },
      data: { "scene": that.data.scene,"path": "pages/welcome", "width": 430 },
      header: {
        'Accept': 'application/json',
        // 'Content-Type': 'image/jpeg'
        // 'responseType': 'arraybuffer',
      },  
      success: function(res){
        var typet = res.header["Content-Type"];
        var prefix = "data:" + typet+";base64,";
        var array = wx.base64ToArrayBuffer(res.data)
        var base64 = wx.arrayBufferToBase64(array)

        // //暂不保存到数据库吧
        // util.doPost(
        //   app.globalData.server + "/saveQRCodeToOrder",
        //   { "orderId": wx.getStorageSync('orderId'), "base64": base64 },
        //   function (res) {
        //   }
        // );


        console.log("getQRCODE:", wx.getStorageSync('orderId'), typet, prefix, res);
        that.setData({ wxaqrCode: prefix+base64 });
        console.log("setQRCODE:", that.data.wxaqrCode);

      },
      fail: function () {
        //UNDO 失败处理
      },
      complete: function () {
        //UNDO 完成后处理
      }
    })

  },
  /**
   * 申请取消
   */
  applyCancel:function(e){
    console.log("applyCancel", wx.getStorageSync('orderId'));
    var that = this;
    wx.request({
      url: app.globalData.server + '/changeOrderStatus?session=' + wx.getStorageSync('third_session'),
      method: 'POST',
      data: { orderId: wx.getStorageSync('orderId'), status: '6' },//已取消
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.showToast({
          title: '成功申请取消',
          icon: 'success',
          duration: 2000
        })
      }
    })

  }
})