//index.js
//获取应用实例

const api = require('../../utils/o2Api.js');

const firstId = '(0)';
const defaultPageSize = 15;

Page({
  data: {
    bannerList:[],
    swiperIndex: 0,
    currentTab: 'news', //当前列表是信息中心还是办公中心： news | tasks
    page: 1, // 分页查询
    lastId: firstId,
    //文章列表，信息中心和办公中心的数据
    /**
    {
        id: '',
        title: '这里是一个新闻标题',
        type: '【新闻通知】',
        date: '2020-09-10',
        tag: 'news'
      }
    **/
    articleList:[]
  },
  
  onLoad: function () {
     this.loadHotNews();
  },
  onShow: function() {
    this.loadArticleList(true);
  },
  // 滚动图片数据请求
  loadHotNews: function() {
    api.hotPicList().then(list => {
      // url前端拼接
      let newList = [];
      for (let i = 0; i < list.length; i++) {
        let element = list[i];
        element.newUrl = this.hotPicUrl(element.picId);
        newList.push(element);
      }
      this.setData({
        bannerList: newList
      })
    }).catch(err => {
      api.o2Error(err)
    })
  },
  // 滚动图片url拼接
  hotPicUrl: function(picId) {
    return api.hotPicUrl(picId)
  },
  loadArticleList: function(isRefresh) {
    if (this.data.currentTab == 'news') {
      this.loadNews(isRefresh);
    }else if (this.data.currentTab == 'tasks') {
      this.loadTasks(isRefresh);
    }
  },
  //查询办公中心数据
  loadTasks: function(isRefresh) {
    var lastId = this.data.lastId;
    if (isRefresh) {
      this.data.lastId = firstId;
      lastId = firstId;
    }
    api.taskList(lastId, defaultPageSize).then(list => {
      if (isRefresh) {
        this.data.articleList = [];
      }
      if (list && list.length > 0) {
        var taskList = [];
        list.forEach(function(v) {
          var obj = {
            id: v.work, //work id 
            title: v.title == '' ? '无标题' : v.title,
            type: '【'+v.processName+'】',
            date: v.startTime.length > 9 ? v.startTime.substring(0, 10) : v.startTime,
            tag: 'tasks'
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
  //查询信息中心数据
  loadNews: function(isRefresh) {
    let param = {
      orderField: '',
      statusList: ['published'],
      justData: true,
    };
    if (isRefresh) {
      this.data.page = 1;
    } else {
      this.data.page++;
    }
    api.cmsDocumentFilterListNew(this.data.page, defaultPageSize, param).then(list => {
      if (isRefresh) {
        this.data.articleList = [];
      }
      if (list && list.length > 0) {
        var newList = [];
        list.forEach(function(v) {
          var obj = {
            id: v.id,
            title: v.title == '' ? '无标题' : v.title,
            type: '【'+v.categoryName+'】',
            date: v.publishTime.length > 9 ? v.publishTime.substring(0, 10) : v.publishTime,
            tag: 'news'
          };
          newList.push(obj);
        });
        this.data.articleList.push(...newList);
        this.setData({
          articleList: this.data.articleList,
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
  swiperChange: function(event) {
    this.setData({
      swiperIndex: event.detail.current
    })
  },

  /**
   * 新建工作
   * @param event 
   */
  bindTapAddProcess: function(event) {
    wx.navigateTo({
      url: '../progress/start-work'
    });
  },

  //点击滚动图片
  bindTapHotNews: function(event) {
    let index = event.currentTarget.dataset.index;
    let data = this.data.bannerList[index];
    if (data.application == 'BBS') { //论坛

    }else if (data.application == 'CMS') { //cms
      wx.navigateTo({
        url: '../cms/cms-web?id=' + data.infoId + '&title=' + encodeURIComponent(data.title)
      });
    }
  },
  //点击新闻或者任务
  bindTapArticle: function(event) {
    let index = event.currentTarget.dataset.index;
    let data = this.data.articleList[index];
    if (data.tag == 'news') { //cms
      wx.navigateTo({
        url: '../cms/cms-web?id=' + data.id + '&title=' + encodeURIComponent(data.title)
      });
    }else if (data.tag == 'tasks') { //待办
      wx.navigateTo({
        url: '../progress/work-web?work='  + data.id + '&title=' + encodeURIComponent(data.title)
      });
    }
  },
  //点击信息中心Tab
  bindTapInfoCenter: function(event) {
    if (this.data.currentTab == 'tasks') {
      this.setData({
        currentTab: 'news'
      });
      this.loadArticleList(true);
    }
  },
  //点击办公中心Tab
  bindTapTaskInfoCenter: function(event) {
    if (this.data.currentTab == 'news') {
      this.setData({
        currentTab: 'tasks'
      });
      this.loadArticleList(true);
    }
  },
  bindTapTaskList: function() {
    wx.navigateTo({
      url: '../progress/work-list?type=task',
    });
  },
  bindTapTaskCompletedList: function() {
    wx.navigateTo({
      url: '../progress/work-list?type=taskCompleted',
    });
  },
  bindTapReadList: function() {
    wx.navigateTo({
      url: '../progress/work-list?type=read',
    });
  },
  bindTapReadCompletedList: function() {
    wx.navigateTo({
      url: '../progress/work-list?type=readCompleted',
    });
  },
   /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // wx.showNavigationBarLoading()
    this.loadHotNews();
    this.loadArticleList(true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.loadArticleList(false);
  },
})
