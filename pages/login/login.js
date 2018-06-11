// pages/login/login.js
var common = require('../../utils/common.js')
var constant = require('../../utils/constant.js')

Page({
  data:{
    account: "",
    password: "",
    focus:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    try {
      var token = wx.getStorageSync(constant.KEY_TOKEN_INDEX);
      console.log("token is [" + token + "]");
      if (token) {
        this.forward2Home();
      }
      
    } catch(e) {
      console.log("getStorageSync have a exception " + e);
    } finally {

    }
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


  ///////////// Customize Method ////////////
  doLogin:function(event) {
    console.log("doLogin start ...");
    console.log("account:" + this.data.account + " password:" + this.data.password);
    console.log("URL : " + constant.LOGIN_URL)

    var param = {"username":this.data.account, "password":this.data.password, "device_id":"4FCC4650-D02F-4143-A544-B79322C05122", "device_type":2}
    var dataStr = common.Encrypt(param)
    console.log("data:" + dataStr)

    param = { "data": dataStr}
    console.log(param)

    wx.showToast({
      title:"加载中...",
      icon:"loading"
    })

    var that = this;
    wx.request({
      url: constant.LOGIN_URL,
      data: param,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log("success:" + res.data.message);

        // wx.setStorages({
        //   key: constant.KEY_TOKEN_INDEX,
        //   data: res.data.token,
        // });
        if (res.data.code != 0) {
          wx.showToast({
            title: res.data.message,
            icon: "none",
            duration: 2000
          });
          return;
        }

        wx.setStorageSync(constant.KEY_TOKEN_INDEX, res.data.data.token);
        console.log("store token:" + res.data.data.token);
        // wx.navigateTo({
        //   url: '../index/index',
        //   success: function(res) {},
        //   fail: function(res) {},
        //   complete: function(res) {},
        // })

        that.forward2Home();
      },
      fail: function(res) {
        // fail
        console.log("fail:" + res);
      },
      complete: function(res) {
        // complete
        console.log("complete:" + res.data);
      }
    })

  },

  bindAccountInput:function(event) {
    this.setData({
      account:event.detail.value
    })
  },

  bindPasswordInput:function(event) {
    this.setData({
      password:event.detail.value
    })
  },

  bindAccountDoNext:function(event) {
    this.setData({
      focus:true
    })
  },

  forward2Home:function() {
    wx.redirectTo({
      url: '../home/home',
    })
  },


})