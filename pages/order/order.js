var common = require('../../utils/common.js')
var constant = require('../../utils/constant.js')

// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPath: constant.IMG_BASE_URL,
    status: '',
    count: 0,
    orders: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);

    this.setData({
      status: options.type,
    });

    this.refreshData();
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
    if (this.data.count == this.data.orders.length) return;
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  ///////// Customize Method /////////
  initData: function () {
    this.refreshData();
  },

  refreshData: function () {
    this.loadData(0);
  },

  loadMore: function () {
    var offset = this.data.orders.length;
    this.loadData(offset);
  },

  loadData: function (offset) {
    var token = wx.getStorageSync(constant.KEY_TOKEN_INDEX);

    var params = {
      state: "tosend",
      offset: offset,
      token: token
    };

    var that = this;
    wx.request({
      url: constant.ORDER_URL,
      data: params,
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
          wx.showModal({
            title: "",
            content: res.data.message,
            showCancel: false
          });
          return;
        }

        var tmpOrders = that.data.orders;

        if (offset == 0) {
          // 下拉刷新
          tmpOrders = res.data.data.data;
        } else {
          // 加载更多
          tmpOrders = tmpOrders.concat(res.data.data.data);
        }
        
        that.setData({
          count: res.data.data._count || 0,
          orders: tmpOrders
        });
      },
      fail: function (res) {
        // fail
        console.log("fail:" + res);
      },
      complete: function (res) {
        // complete
        console.log(res.data.data.data);

        wx.stopPullDownRefresh();
      }
    });
  },
})