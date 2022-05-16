// pages/cms-web.js

const api = require('../../utils/o2Api.js');
const util = require('../../utils/util.js');

Page({

  /**
   * Page initial data
   */
  data: {
    workUrl: '',
    navTitle: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var id = options.id;
    var title = decodeURIComponent(options.title);
    if (id && id != '') {
      var url = api.cmsWebUrl(id);
      var who = wx.getStorageSync('who');
      var tokenName = wx.getStorageSync('tokenName');
      var token = ''
      if (who && who.token) {
        token = who.token;
        url = url + '&'+tokenName+'=' + token;
      }
      url = url + '#wechat_redirect';
      this.setData({
        workUrl: url,
        navTitle: title
      });
    }else {
      util.toast('没有传入信息id！');
      wx.navigateBack({
        delta: 1,
      });
    } 
    
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