// pages/file/download.js
const util = require('../../utils/util.js');
const api = require('../../utils/o2Api.js');

Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    util.showLoading();
    var attId = options.attId; //附件id
    var type = options.type; // work ｜ cms | bbs
    console.log('attId:', attId, ' type: ', type);
    if (!attId || !type) {
      util.hideLoading();
      console.log('没有传入参数！');
      wx.navigateBack({
        delta: 1,
      });
    }else {
      if (type == 'work') {  // type = work
        if (options.workCompleted) {
          var url = api.workCompletedAttachementUrl(attId, options.workCompleted);
          this.downloadFileAndOpen(url);
        } else if (options.work) {
          var url = api.workAttachmentUrl(attId, options.work);
          this.downloadFileAndOpen(url);
        }else {
          util.hideLoading();
          console.log('没有传入工作id！');
          wx.navigateBack({
            delta: 1,
          });
        }
      } else if (type == 'cms') {//type = cms
        // var documentId = options.documentId;
        var url = api.cmsAttachementUrl(attId);
        this.downloadFileAndOpen(url);
      } else if (type == 'bbs') {//type = bbs
        // var subjectId = options.subjectId;
        var url = api.bbsAttachementUrl(attId);
        this.downloadFileAndOpen(url);
      }else {
        util.hideLoading();
        console.log('参数type不正确！');
        wx.navigateBack({
          delta: 1,
        });
      }
    }
  },
  //下载文件
  downloadFileAndOpen: function (url) {
    var who = wx.getStorageSync('who');
    var token = '';
    if (who && who.token) {
      token = who.token;
    }
    wx.downloadFile({
      url: url,
      header: {
        'x-token': token
      },
      success(res) {
        if (res.statusCode === 200) {
          console.log(res)
          var filePath = res.tempFilePath
          wx.navigateBack({
            delta: 1,
            success: function() {
              // 打开这个文件
              wx.openDocument({
                filePath: filePath,
                success: function (res) {
                  console.log('打开文档成功')
                }
              });
            }
          });
        } else {
          util.hideLoading();
          util.toast('下载失败！');
          wx.navigateBack({
            delta: 1,
          });
        }
      },
      fail(res) {
        util.hideLoading();
        util.toast('下载失败！');
        wx.navigateBack({
          delta: 1,
        });
      }
    })
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