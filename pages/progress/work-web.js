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
    var work = options.work;
    var title = decodeURIComponent(options.title);
    console.log("进入 work web页面， work:", work);
    if (work && work != '') {
      var url = api.workWebUrl(work);
      var who = wx.getStorageSync('who');
      var token = ''
      if (who && who.token) {
        token = who.token;
        url = url + '&x-token=' + token;
      }
      console.log('待办页面 url', url);
      this.setData({
        workUrl: url,
        navTitle: title
      });
    }else {
      util.toast('没有传入待办workId！');
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