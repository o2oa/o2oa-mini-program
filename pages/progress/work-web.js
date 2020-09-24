// pages/progress/work-web.js

const api = require('../../utils/o2Api.js');
const util = require('../../utils/util.js');



Page({

  /**
   * Page initial data
   */
  data: {
    workUrl:'',
    navTitle: ''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var title = decodeURIComponent(options.title);
    if(!options.workCompleted && !options.work) {
      util.toast('参数错误！');
      wx.navigateBack({
        delta: 1,
      });
    } else if(!options.workCompleted) {
      this.openWorkUrl(options.work, title);
    } else {
      this.openWorkCompletedUrl(options.workCompleted, title);
    }
  },
  // 打开工作表单 未完成的工作
  openWorkUrl: function(work, title = '') {
    var url = api.workWebUrl(work);
    var who = wx.getStorageSync('who');
    var token = ''
    if (who && who.token) {
      token = who.token;
      url = url + '&x-token=' + token;
    }
    url = url + '#wechat_redirect';
    console.log('待办页面 url', url);
    this.setData({
      workUrl: url,
      navTitle: title
    });
  },
  // 打开工作表单 已结束的工作
  openWorkCompletedUrl: function(workcompletedid, title = '') {
    var url = api.workCompletedWebUrl(workcompletedid);
    var who = wx.getStorageSync('who');
    var token = ''
    if (who && who.token) {
      token = who.token;
      url = url + '&x-token=' + token;
    }
    url = url + '#wechat_redirect';
    console.log('待办页面 url', url);
    this.setData({
      workUrl: url,
      navTitle: title
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