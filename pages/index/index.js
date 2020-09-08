//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    nbTitle: '首页',
    bannerList:[],
    swiperIndex: 0,
    articleList:[
      {
        title: '这里是一个新闻标题',
        type: '【新闻通知】',
        date: '2020-09-10',
        link: 'openLink'
      }
    ]
  },
  
  onLoad: function () {
     
  }
})
