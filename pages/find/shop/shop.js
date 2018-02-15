//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //轮播图
    imgUrls: [
      '../../../images/1.png',
      '../../../images/3.png',
      '../../../images/4.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  onLoad: function () {
    
  },
  golist: function () {
    wx.navigateTo({
      url: '../list/list'
    })
  },
  showAddr: function (){
    wx.openLocation({
      latitude: 31.929360,
      longitude: 118.892042,
      scale: 18,
      name: '取餐地点',
      address: '南京市江宁区月华西路1号'
    })
  },
  doCall: function(){
    wx.makePhoneCall({
      phoneNumber: '13951036073' //仅为示例，并非真实的电话号码
    })
  }
})
