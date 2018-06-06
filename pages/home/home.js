var common = require('../../utils/common.js')
var constant = require('../../utils/constant.js')

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tradeAmount: "--.--",
    guiderCommission: "--.--",
    todayOrder: "--",
    todayUser: "--",
    yesterdayCustomer: "--"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
    this.refreshData();
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
  
  },

  ///////////// Customize Method //////////
  initData: function () {
    this.refreshData();
  },

  refreshData: function () {

    var token = wx.getStorageSync(constant.KEY_TOKEN_INDEX);
    var param = { "token": token };
    var that = this;
    wx.request({
      url: constant.HOME_URL,
      data: param,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        // success
        console.log("success:" + res.data.message);

        if (res.data.code == 10001) {
          wx.clearStorageSync(constant.KEY_TOKEN_INDEX);
          wx.showToast({
            title: res.data.message,
            icon: "none",
            duration: 2000
          });

          wx.redirectTo({
            url: '../login/login',
          });
          return;
        }

        if (res.data.code != 0) {
          wx.showToast({
            title: res.data.message,
            icon: "none",
            duration: 2000
          });
          return;
        }

        that.setData({
          tradeAmount: res.data.data.trade_amount,
          guiderCommission: res.data.data.guider_comission,
          todayOrder: res.data.data.trade_count,
          todayUser: res.data.data.guider_count,
          yesterdayCustomer: res.data.data.member_count
        });

        wx.setNavigationBarTitle({
          title: res.data.data.shop_name,
        });
      },
      fail: function (res) {
        // fail
        console.log("fail:" + res);
      },
      complete: function (res) {
        // complete
        console.log("complete:" + res.data);

        wx.stopPullDownRefresh();
      }
    })
  },

  forward2Order: function (event) {
    console.log(event);
    wx.navigateTo({
      url: '../order/order?status=' + event.currentTarget.id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  doLogout: function (event) {

    wx.showModal({
      title: '',
      content: '确定退出登录？',
      success: function(res) {
        if (res.confirm) {
          wx.clearStorage();

          wx.reLaunch({
            url: '../login/login',
          })
        }
      },
    });
  },
})