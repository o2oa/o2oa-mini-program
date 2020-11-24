// pages/progress/start-work.js

const api = require('../../utils/o2Api.js');
const util = require('../../utils/util.js');

Page({

  /**
   * Page initial data
   */
  data: {
    navTitle: '创建工作',
    currentAppId: '',
    applicationList: [],
    processList: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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
    this.loadApplication()
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

  },

  /**
   * 获取流程应用列表
   */
  loadApplication: function () {
    util.showLoading()
    api.applicationList().then(list => {
      var pList = []
      var cid = ''
      if (list && list.length > 0) {
        pList = list[0].processList
        cid = list[0].id
      }
      this.setData({
        applicationList: list,
        processList: pList,
        currentAppId: cid
      });
      util.hideLoading()
    }).catch(err => {
      util.hideLoading()
      api.o2Error(err);
    })
  },

  bindTapApplication: function(e) {
    let index = e.currentTarget.dataset.index;
    let app = this.data.applicationList[index];
    this.setData({
      processList: app.processList,
      currentAppId: app.id
    })
  },

  bindTapProcess: function(e) {
    
  }
})