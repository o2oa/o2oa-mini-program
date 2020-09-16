// pages/login/register.js
let util = require('../../utils/util.js')
const api = require('../../utils/o2Api.js');

Page({

  /**
   * Page initial data
   */
  data: {
    name: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    codeAnswer: '',
    genderType: 'm',
    focusLabel: '',
    sending: false //是否正在发送验证码
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },
  bindfocusFun: function(event) {
    var label = event.currentTarget.dataset.label;
    if (label) {
      this.setData({
        focusLabel: label
      });
    }
  },
  bindInputFun: function(event) {
    var label = event.currentTarget.dataset.label;
    if (label == 'name') {
      this.data.name = event.detail.value;
    }else if (label == 'password') {
      this.data.password = event.detail.value;
    }else if (label == 'confirmPassword') {
      this.data.confirmPassword = event.detail.value;
    }else if (label == 'mobile') {
      this.data.mobile = event.detail.value;
    }else if (label == 'codeAnswer') {
      this.data.codeAnswer = event.detail.value;
    }
    
  },
  bindSendCode: function(event) {
    if (!this.data.mobile || this.data.mobile == '') {
      util.toast('请先输入手机号码！');
    }else {
      api.sendSms(this.data.mobile).then(res => {
        console.log('发送验证码', res);
        if (res.value) {
          util.toast('发送成功！');
        }else {
          util.toast('发送失败！');
        }
      }).catch( err => {
        api.o2Error(err);
      })
    }
  },
  bindTapRegister: function() {
    if (this.data.name.length == 0) {
      util.toast("请输入用户名！");
      return;
    }
    if (this.data.password.length == 0) {
      util.toast("请输入密码！");
      return;
    }
    if (this.data.confirmPassword.length == 0) {
      util.toast("请输入确认密码！");
      return;
    }
    if (this.data.confirmPassword != this.data.password) {
      util.toast("两次密码输入不一致！");
      return;
    }
    if (this.data.mobile.length == 0) {
      util.toast("请输入手机号码！");
      return;
    }
    if (this.data.codeAnswer.length == 0) {
      util.toast("请输入手机验证码！");
      return;
    }
    api.register(this.data).then(res => {
      console.log(res);
      if (res.value) {
        util.toast('注册成功！')
        wx.navigateBack({
          delta: 1,
        });
      }else {
        util.toast('注册失败！')
      }
    }).catch(err =>  {
      api.o2Error(err, '注册失败！');
    })
  },
  toLogin: function() {
    wx.navigateBack({
      delta: 1,
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})