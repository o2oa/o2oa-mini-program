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
    if(!options.workCompleted && !options.work && !options.draft) {
      util.toast('参数错误！');
      wx.navigateBack({
        delta: 1,
      });
    } else if(options.workCompleted) {
      this.openWorkCompletedUrl(options.workCompleted, title);
    } else if(options.work) {
      this.openWorkUrl(options.work, title);
    } else if(options.draft) {
      this.openDraft(options.draft, title);
    }
  },

  // 生成url
  _urlWithToken: function(url) {
    let newUrl = url;
    const who = wx.getStorageSync('who');
    const tokenName = wx.getStorageSync('tokenName');
    let token = ''
    if (who && who.token) {
      token = who.token;
      newUrl = newUrl + '&'+tokenName+'=' + token;
    }
    return newUrl + '#wechat_redirect';
  },
  // 打开工作表单 草稿
  openDraft: function(draft, title = '') {
    let url = api.workDraftUrl(draft);
    url = this._urlWithToken(url);
    this.setData({
      workUrl: url,
      navTitle: title
    });
  },
  // 打开工作表单 未完成的工作
  openWorkUrl: function(work, title = '') {
    let url = api.workWebUrl(work);
    url = this._urlWithToken(url);
    this.setData({
      workUrl: url,
      navTitle: title
    });
  },
  // 打开工作表单 已结束的工作
  openWorkCompletedUrl: function(workcompletedid, title = '') {
    let url = api.workCompletedWebUrl(workcompletedid);
    url = this._urlWithToken(url);
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