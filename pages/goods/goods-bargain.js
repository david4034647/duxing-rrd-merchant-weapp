// pages/goods/goods-bargain.js
var common = require('../../utils/common.js')


// 获取应用实例
var app = getApp()
var page = 0
var pageSize = 10
//var url = "https://api.daodian100.com/v2/app/get-app-version"
var url = "http://mobile.rrdshang.com/goodstype/goodstype"

var LoadList = function(that, currentPage) {
  wx.request({
    url: url,
    data: {id:2, from:(currentPage*pageSize), size:pageSize},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res){
      console.log("wx request success start ...");
      console.log(res);
      // success
      var goodsList = currentPage===0?[]:that.data.goodsList
      
      var data = []

        data = res.data.hits.hits
        for (var i=0; i<data.length; i++) {
          console.log(data[i]);
          var price = common.formatCurrency(data[i]._source.bargain_min_price);
          console.log(price);

          data[i]._source.bargainOriPrice = common.formatCurrency(data[i]._source.bargain_original_price) || 0;

          goodsList.push(data[i]);
        }
        that.setData({goodsList:goodsList})
        console.log("page index currentPage: " + currentPage + " page: " + page);
        page ++


    },
    fail: function() {
      // fail
      console.log("wx request fail start ...");
    },
    complete: function() {
      // complete
      console.log("wx request complete start ...");
      wx.stopPullDownRefresh()
    }
  })
}

Page({
  data:{goodsList:[], scrollTop:0, scrollHeight:0, pageWidth:0},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this

    wx.getSystemInfo({
      success:function(res) {
        console.log(res.windowWidth)
        that.setData({scrollHeight:res.windowHeight, pageWidth:res.windowWidth})
      }
    })

    page = 0
    LoadList(that, page);
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },



  ////////////////// Customize Method /////////////
  onPullDownRefresh:function() {
    this.onLoad()

    wx.showToast({
      title:"加载中...",
      icon:"loading"
    })
  },

  onReachBottom:function() {
    console.log("onReachBottom start ...")

    var that = this
    LoadList(that, page);
  },

  bindDownLoad:function() {
    console.log("bindDownLoad start ...")
    var that = this
    GetList(that)
  },

  scroll:function(event){
    console.log("scroll start ...")
        this.setData({
            scrollTop : event.detail.scrollTop
        })
  },

  onListViewItemClicked:function(event) {
    console.log("onListViewItemClicked start ...")

    wx.navigateTo({
      url: '../index/index',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
})