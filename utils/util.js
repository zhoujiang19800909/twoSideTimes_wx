//utils.util.js
const testData = require('testData')
var app = getApp()


var runMode = 'demo'

//get请求
function doGet(url,successCB){
  console.log("------------util.doGet-------------",url);
  if (runMode == 'demo') {//DEMO模式下，获取本地测试数据
    var data = testData.getData(url)
    successCB({ 'success': true, 'data': data, 'msg': '' })
  }else{
    wx.request({
      url: url,
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: successCB,
      fail: function () {
        //UNDO 失败处理
      },
      complete: function () {
        //UNDO 完成后处理
      }
    })
  }
  



  return "";
}

//post请求
function doPost(url, data, successCB) {
  console.log("------------util.doPost-------------", url);
  if (runMode == 'demo') {//DEMO模式下，获取本地测试数据
    var result = testData.getData(url)
    successCB({ 'success': true, 'data': result, 'msg': '' })
  } else {
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      header: {
        'Accept': 'application/json',
      },
      success: successCB,
      fail: function () {
        //UNDO 失败处理
      },
      complete: function () {
        //UNDO 完成后处理
      }
    })
  }




  return "";
}



//时间格式转换
function formatTime(date) {

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

//日期格式转换
function formatDate(date) {

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()


  return [year, month, day].map(formatNumber).join('/') 
}

//数字格式转换
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  doGet: doGet,
  doPost: doPost
}
