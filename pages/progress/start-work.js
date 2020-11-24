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
    processList: [],
    currentProcess: null,
    showChooseIdentityDialog: false,
    identityList: [],
    selectedIdentity: ''
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

  /**
   * 选择身份
   */
  showChooseIdentityDialog: function(identityList){
    this.setData({
      showChooseIdentityDialog: true,
      identityList: identityList
    })
  },

  /**
   * 启动流程实例
   * @param {*} identityDn 
   */
  startProcess: function(identityDn) {
    let body = {"identity": identityDn}
    api.createWork(this.data.currentProcess.id, body).then(result => {
      util.hideLoading()
      let work = result[0].taskList[0].work
      let activityName = result[0].taskList[0].activityName
      if (work) {
        wx.navigateBack({
          delta: 1,
          complete: function() {
            wx.navigateTo({
              url: '../progress/work-web?work='  +work + '&title=' + encodeURIComponent(activityName)
            });
          }
        })
      }
    }).catch(err => {
      util.hideLoading()
      api.o2Error(err);
    })
  },

  /**
   * 启动草稿
   * @param {*} identityDn 
   */
  startDraft: function(identityDn) {
    let body = {"identity": identityDn}
    api.createDraft(this.data.currentProcess.id, body).then(result => {
      console.log(result)
      console.log(result.work)
      util.hideLoading()
      if (result.work) {
        let draft = JSON.stringify(result.work)
        wx.navigateBack({
          delta: 1,
          complete: function() {
            wx.navigateTo({
              url: '../progress/work-web?draft=' + encodeURIComponent(draft)
            });
          }
        })
      }
    }).catch(err => {
      util.hideLoading()
      api.o2Error(err);
    })
  },

  /**
   * 启动
   * @param {*} identityDn 
   */
  start: function(identityDn) {
    util.showLoading()
    if(this.data.currentProcess && this.data.currentProcess.defaultStartMode && this.data.currentProcess.defaultStartMode === 'draft') {
      this.startDraft(identityDn)
    }else {
      this.startProcess(identityDn)
    }
  },

  bindTapApplication: function(e) {
    let index = e.currentTarget.dataset.index
    let app = this.data.applicationList[index]
    this.setData({
      processList: app.processList,
      currentAppId: app.id
    })
  },

  bindTapProcess: function(e) {
    let index = e.currentTarget.dataset.index
    let process = this.data.processList[index]
    this.data.currentProcess = process
    util.showLoading()
    api.listAvailableIdentityWithProcess(process.id).then(list => {
      if (list && list.length > 0) {
        if (list.length > 1) {
          this.showChooseIdentityDialog(list)
        }else {
          this.start(list[0].distinguishedName)
        }
      } else {
        util.toast('没有获取到当前用户的身份，无法启动流程！')
      }
    }).catch(err => {
      util.hideLoading()
      api.o2Error(err);
    })
  },

  tapDialogButton: function(e) {
    this.setData({
      showChooseIdentityDialog: false
    });
    if (e.detail.index == 1) {
      this.start(this.data.selectedIdentity)
    }
  },

  identityRadioChange: function(e) {
    this.data.selectedIdentity = e.detail.value
  }
})