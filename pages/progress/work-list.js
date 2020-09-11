// pages/progress/work-list.js

const api = require('../../utils/o2Api.js');
const util = require('../../utils/util.js');
const firstId = '(0)';
const defaultPageSize = 15;

Page({
  /**
   * Page initial data
   */
  data: {
    navTitle: '',
    type: 'task', //task | taskCompleted | read | readCompleted
    articleList: [],
    lastId: firstId,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    if(!options.type) {
      util.toast('参数不正确！');
      wx.navigateBack({
        delta: 1,
      });
    }else {
      if (options.type == 'task') {
        this.setData({
          navTitle: '待办列表',
          type:'task'
        });
        this.loadData(true);
      } else if (options.type == 'taskCompleted') {
        this.setData({
          navTitle: '已办列表',
          type:'taskCompleted'
        });
        this.loadData(true);
      } else if (options.type == 'read') {
        this.setData({
          navTitle: '待阅列表',
          type:'read'
        });
        this.loadData(true);
      } else if (options.type == 'readCompleted') {
        this.setData({
          navTitle: '已阅列表',
          type:'readCompleted'
        });
        this.loadData(true);
      } else {
        util.toast('参数不正确！');
        wx.navigateBack({
          delta: 1,
        });
      }
    }
  },
  loadData: function(isRefresh) {
    var lastId = this.data.lastId;
    if (isRefresh) {
      this.data.lastId = firstId;
      lastId = firstId;
    }
    if (this.data.type == 'task') {
      var future = api.taskList(lastId, defaultPageSize);
    } else if (this.data.type == 'taskCompleted') { 
      var future = api.taskCompletedList(lastId, defaultPageSize);
    } else if (this.data.type == 'read') { 
      var future = api.readList(lastId, defaultPageSize);
    } else if (this.data.type == 'readCompleted') { 
      var future = api.readCompletedList(lastId, defaultPageSize);
    }
    future.then(list => {
      if (isRefresh) {
        this.data.articleList = [];
      }
      if (list && list.length > 0) {
        var taskList = [];
        list.forEach(function(v) {
          var obj = {
            work: v.work,
            workCompleted: v.workCompleted,
            title: v.title == '' ? '无标题' : v.title,
            type: '【'+v.processName+'】',
            date: v.startTime.length > 9 ? v.startTime.substring(0, 10) : v.startTime
          };
          taskList.push(obj);
        });
        this.data.articleList.push(...taskList);
        var lastId = list[list.length-1].id;
        this.setData({
          articleList: this.data.articleList,
          lastId: lastId
        });
      }else {
        this.setData({
          articleList: this.data.articleList
        });
      }
      wx.stopPullDownRefresh();
    }).catch(err => {
      api.o2Error(err);
      wx.stopPullDownRefresh();
    })
  },

  bindTapArticle: function(event) {
    let index = event.currentTarget.dataset.index;
    let data = this.data.articleList[index];
    if (!data.workCompleted) {
      wx.navigateTo({
        url: '../progress/work-web?work='  + data.work + '&title=' + encodeURIComponent(data.title)
      });
    }else {
      wx.navigateTo({
        url: '../progress/work-web?workCompleted='  + data.workCompleted + '&title=' + encodeURIComponent(data.title)
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
    this.loadData(true);
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {
    this.loadData(false);
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {
    
  }
})