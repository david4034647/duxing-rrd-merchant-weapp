// pages/login/login.js
var common = require('../../utils/common.js')
var constant = require('../../utils/constant.js')

Page({
  data:{
    account: "",
    password: "",
    shakeAnimAccount: {},
    shakeAnimPassword: {},
    loginAnimation: {},
    masklAnimation: {},
    maskrAnimation: {},
    maskcAnimation: {},
    btnCSS:"8rpx",
    maskHidden: true
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
    var that = this
    var query = wx.createSelectorQuery()
    query.select('#login-btn').boundingClientRect(function(res){
      console.log(res)
      that.loginBtn = res.width
    }).exec()
    query.select('#maskl').boundingClientRect(function (res) {
      that.maskl = res.width
    }).exec()
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

    var shakeAnim = this.shakeAnimation()

    if (this.data.account.length === 0) {

      this.setData({
        shakeAnimAccount: shakeAnim.export()
      })
      return;
    }

    if (this.data.password.length === 0) {
    
      this.setData({
        shakeAnimPassword: shakeAnim.export()
      })
      return;
    }

    var param = {"username":this.data.account, "password":this.data.password, "device_id":"4FCC4650-D02F-4143-A544-B79322C05122", "device_type":2}
    var dataStr = common.Encrypt(param)
    console.log("data:" + dataStr)

    param = { "data": dataStr}
    console.log(param)

    // wx.showToast({
    //   title:"加载中...",
    //   icon:"loading"
    // })

    var startLoginAnimation = this.startLoginAnimation()
    var startMaskLAnimation = this.startMaskLAnimation()
    var startMaskRAnimation = this.startMaskRAnimation()
    var startMaskCAnimation = this.startMaskCAnimation()
    this.setData({
      maskHidden: false,
      btnCSS: "90rpx",
      masklAnimation: startMaskLAnimation.export(),
      maskrAnimation: startMaskRAnimation.export(),
      maskcAnimation: startMaskCAnimation.export(),
      loginAnimation: startLoginAnimation.export()
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
            icon: "fail",
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

        var stopLoginAnimation = that.stopLoginAnimation()
        setTimeout(function() {
          that.setData({
            maskHidden: true,
            btnCSS: "8rpx",
            loginAnimation: stopLoginAnimation.export()
          })
        }.bind(that), 800)
        
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

  forward2Home:function() {
    wx.redirectTo({
      url: '../home/home',
    })
  },

  shakeAnimation:function() {
    
    var shakeAnim = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-in-out',
      delay: 0
    })

    shakeAnim.translate(10).step()
    shakeAnim.translate(-10).step()
    shakeAnim.translate(10).step()
    shakeAnim.translate(-10).step()
    shakeAnim.translate(0).step()

    return shakeAnim
  },

  startLoginAnimation:function() {
    var startLoginAnimation = wx.createAnimation({
      duration: 150,
      timingFunction: 'ease-out',
      delay: 0
    })

    startLoginAnimation.scale(0, 1).step()
    return startLoginAnimation
  },

  stopLoginAnimation:function() {
    var stopLoginAnimation = wx.createAnimation({
      duration: 150,
      timingFunction: 'ease-in',
      delay: 0
    })

    stopLoginAnimation.scale(1, 1).step()
    return stopLoginAnimation
  },

  startMaskLAnimation:function() {
    var anim = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease-out',
      delay: 0,
      
    })

    anim.translate((this.loginBtn - this.maskl)/2).step()
    return anim
  },

  startMaskRAnimation: function () {
    var anim = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease-out',
      delay: 0,

    })

    anim.translate(-(this.loginBtn - this.maskl) / 2).step()
    return anim
  },

  startMaskCAnimation:function() {
    var anim = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease-out',
      delay: 0,

    })

    return anim
  },

})