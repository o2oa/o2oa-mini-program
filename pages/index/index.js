//index.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
const api = require('../../utils/o2Api.js');
const o2Request = require('../../utils/o2Request.js');

const firstId = '(0)';
const defaultPageSize = 15;

Page({
  data: {
    bannerList:[],
    swiperIndex: 0,
    currentTab: 'news', //当前列表是信息中心还是办公中心： news | tasks
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
     this.loadArticleList(true);
  },
  loadHotNews: function() {
    api.hotPicList().then(list => {
      console.log(list);
      this.setData({
        bannerList: list
      })
    }).catch(err => {
      api.o2Error(err)
    })
  },
  loadArticleList: function(isRefresh) {
    if (this.data.currentTab == 'news') {
      this.loadNews(isRefresh);
    }else if (this.data.currentTab == 'tasks') {

    }
  },
  loadNews: function(isRefresh) {
    let param = {
      orderField: '',
      statusList: ['published']
    };
    var lastId = this.data.lastId;
    if (isRefresh) {
      this.data.lastId = firstId;
      lastId = firstId;
    }
    api.cmsDocumentFilterList(lastId, defaultPageSize, param).then(list => {
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
  swiperChange: function(event) {
    this.setData({
      swiperIndex: event.detail.current
    })
  },
  bindTapHotNews: function(event) {
    let infoId = event.currentTarget.dataset.info;
    let application = event.currentTarget.dataset.application;
    console.log('打开图片新闻 infoId:', infoId, 'app:', application);
  },
  bindTapArticle: function(event) {
    let id = event.currentTarget.dataset.id;
    let tag = event.currentTarget.dataset.tag;
    console.log('打开 新闻 id:', id , 'tag:', tag);
  },

   /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
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
