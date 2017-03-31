// pages/login/login.js
var common = require('../../utils/common.js')

Page({
  data:{
    account: "",
    password: ""
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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

  }




})