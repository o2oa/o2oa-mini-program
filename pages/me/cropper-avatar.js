// pages/me/cropper-avatar.js

const util = require("../../utils/util");
const api = require('../../utils/o2Api.js');
const Multipart = require('../../components/multipart/Multipart.min.js');

Page({

  /**
   * Page initial data
   */
  data: {
    src:'',
    width: 250,//宽度
    height: 250,//高度
    max_width: 400,
    max_height: 400
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    //打开当前页面 直接 本地图片选择
    this.cropper = this.selectComponent("#image-cropper");
    this.cropper.upload();//选择图片
  },
  cropperload(e) {
    console.log('cropper加载完成');
  },
  //重制图片加载
  loadimage(e){
    wx.hideLoading();
    this.cropper.imgReset();
  },
  //选择本地图片进行裁剪
  chooseImage(){
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showLoading({
          title: '加载中',
        })
        const tempFilePaths = res.tempFilePaths[0];
        //重置图片角度、缩放、位置
        that.cropper.imgReset();
        that.setData({
          src: tempFilePaths
        });
      }
    })
  },
  // 提交图片
  submit(){
    this.cropper.getImg((obj)=>{      
      const tempFilePath = obj.url;
      console.log('裁剪完成，，', tempFilePath);
      var who = wx.getStorageSync('who');
      var tokenName = wx.getStorageSync('tokenName');
      var token = '';
      if (who && who.token) {
        token = who.token;
      }
      let m=new Multipart({files:[], fields:[]})
      m.file({
        filePath: tempFilePath,
        name: 'file'
      })
      m.submit(api.uploadMyAvatarUrl(), 
      {
        method: 'PUT', 
        header: {
          tokenName: token
      }}).then(res => {
        const data = res.data
        console.log('上传头像完成', data);
        if (data.type == 'error') {
          util.toast('上传失败！');
        }
        wx.navigateBack({
          delta: -1
        })
      }).catch(err => {
        console.log('上传头像失败', err);
        util.toast('上传失败！');
        wx.navigateBack({
          delta: -1
        })
      })
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