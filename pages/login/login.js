let util = require('../../utils/util.js')
const api = require('../../utils/o2Api.js');

Page({
  data: {
    isShowLogin: false,
    name: '',
    password: '',
    nameFocus: true,
    passwordFocus: false,
    registerEnable: false
  },
  onLoad: function () {
    this.connectCenterServer();
  },
  //连接中心服务器获取应用连接地址
  connectCenterServer: function() {
    api.centerServer().then(data => {
      api.setDistribute(data);
      this.checkIsLogin();
    }).catch( err => {
      console.log('连接中心服务器失败', err);
      util.toast('连不上O2OA服务器，请检查网络！');
    });
  },
  //检查登录
  checkIsLogin: function() {
    var who = wx.getStorageSync('who');
    if (who && who.token) {
      //检查是否过期
      api.who().then(data => {
        if(data.token && data.token != "") {
          wx.setStorageSync('who', data);
          //跳转到首页
          wx.switchTab({
            url: '../index/index'
          })
        }else {
          wx.removeStorageSync('who');
          //过期
          this.setData({
            isShowLogin: true
           });
        }
      }).catch(err => {
        //已经过期？
        wx.removeStorageSync('who');
        this.setData({
          isShowLogin: true
         });
      });
    }else {
      this.setData({
        isShowLogin: true
       });
    }
  },
  checkRegisterMode: function() {
    api.registerMode().then(res => {
      if (res.value == 'code' ) {
        this.setData({
          registerEnable: true
        })
      }
    })
  },

  inputName: function(event) {
    this.data.name = event.detail.value;
  },

  inputPassword: function(event) {
    this.data.password = event.detail.value;
  },
  nameBindfocus: function() {
    this.setData({
      nameFocus: true,
      passwordFocus: false
    })
  },

  passwordBindfocus: function() {
    this.setData({
      nameFocus: false,
      passwordFocus: true
    })
  },
  login: function() {
    if (this.data.name.length == 0) {
      util.toast("请输入用户名！");
      return;
    }
    if (this.data.password.length == 0) {
      util.toast("请输入密码！");
      return;
    }
    const param = {
      credential: this.data.name,
      password: this.data.password
    }
    api.login(param)
      .then(data => {
        wx.setStorageSync('who', data);
        util.toast('登录成功~');
        //跳转到首页
        wx.switchTab({
          url: '../index/index'
        })
      }).catch(err => {
        console.log('登录失败', err);
        api.o2Error(err, '登录失败');
      });
  },
  toRegister: function() {
    wx.navigateTo({
      url: './register',
    })
  },
  // 长按扫码
  openMPWxImage: function() {
    wx.previewImage({
      current: 'https://www.o2oa.net/imagex/experience/zoneland_mpweixin.jpg',
      urls: ['https://www.o2oa.net/imagex/experience/zoneland_mpweixin.jpg'],
    })
  },
  // 体验账号登录
  demoLogin: function(event) {
    let no = event.currentTarget.dataset.no;
    const param = {
      password: 'o2'
    };
    if (no == '1') {
     param['credential'] = '开发部经理'
    } else if (no == '2') {
      param['credential'] = '开发部员工1'
    } else if (no == '3') {
      param['credential'] = '公司领导1'
    } else if (no == '4') {
      param['credential'] = '办公室主任'
    }
    api.login(param)
      .then(data => {
        wx.setStorageSync('who', data);
        util.toast('登录成功~');
        //跳转到首页
        wx.switchTab({
          url: '../index/index'
        })
      }).catch(err => {
        console.log('登录失败', err);
        api.o2Error(err, '登录失败');
      });
  }
})