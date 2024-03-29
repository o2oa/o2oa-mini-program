
let util = require('../../utils/util.js')
const api = require('../../utils/o2Api.js');
const o2Api = require('../../utils/o2Api.js');

Page({
  data: {
    showDialog: false,
    showLogoutDialog: false,
    dialogLabel: '',
    dialogValue: '',
    dialogPlaceholder: '',
    dialogParam: '',
    avatarUrl: '',
    person: {}
  },
  onLoad: function () {
    this.loadPersonInfo();
  },
  onShow: function() {
    this.avatar();  
  },
  loadPersonInfo: function() {
    //获取用户信息
    api.me().then(info => {
      this.setData({
        person: info
      });
    }).catch(err => {
      api.o2Error(err);
    });
  },
  //获取头像文件
  avatar: function() {
    var who = wx.getStorageSync('who');
    var tokenName = wx.getStorageSync('tokenName');
    var token = '';
    if (who && who.token) {
      token = who.token;
    }
    var url = api.myAvatarUrl();
    var _self = this;
    wx.downloadFile({
      url: url,
      header: {
        tokenName: token
      },
      success(res) {
        if (res.statusCode === 200) {
          console.log(res)
          var filePath = res.tempFilePath
          _self.setData({
            avatarUrl: filePath
          });
        } else {
          _self.setData({
            avatarUrl: '../../assets/img/icon_my_avatar.png'
          });
        }
      },
      fail(res) {
        _self.setData({
          avatarUrl: '../../assets/img/icon_my_avatar.png'
        });
      }
    })
  },
  handleContact: function(e) {
    //点击客服消息可以传送路径和query参数过来
    console.log(e.detail.path)
    console.log(e.detail.query)
  },
  bindTapLogout: function(event) {
    this.setData({
      showLogoutDialog: true
    });
  },
  bindTapAvatar: function(event) {
    wx.navigateTo({
      url: './cropper-avatar',
    });
  },
  bindTapLine: function(event) {
    console.log(event);
    let param = event.currentTarget.dataset.param;
    let value = '';
    let placeholder = '';
    let label = '';
    if (!param) {
      return;
    } else if (param == 'mail') {
      value = this.data.person.mail;
      label = '邮件地址';
      placeholder = '请输入邮件地址';
    } else if (param == 'mobile') {
       value = this.data.person.mobile;
       label = '手机号码';
       placeholder = '请输入手机号码';
    } else if (param == 'officePhone') {
       value = this.data.person.officePhone;
       label = '办公电话';
      placeholder = '请输入办公电话';
    } else if (param == 'signature') {
       value = this.data.person.signature;
       label = '个人签名';
      placeholder = '请输入个人签名';
    }
    this.setData({
      showDialog: true,
      dialogLabel: label,
      dialogPlaceholder: placeholder,
      dialogValue: value,
      dialogParam:  param
    });
  },
  getDialogInputValue: function(event) {
    this.data.dialogValue = event.detail.value;
  },
  tapDialogButton: function(event) {
    console.log(event);
    var value = this.data.dialogValue;
    var param = this.data.dialogParam;
    console.log('value:', value, ',param:', param);
    this.setData({
      showDialog: false,
      dialogLabel: '',
      dialogValue: '',
      dialogParam:  ''
    });
    if (event.detail.index == 1) {
      const person =  JSON.parse(JSON.stringify(this.data.person));//Object.clone(this.data.person);
      if (!value ) {
        var value = ''
      }
      if (param == 'mail') {
        person.mail = value;
        this.putPerson(person);
      }else if (param == 'mobile') {
        person.mobile = value;
        this.putPerson(person);
      }else if (param == 'officePhone') {
        person.officePhone = value;
        this.putPerson(person);
      }else if (param == 'signature') {
        person.signature = value;
        this.putPerson(person);
      }
    }
  },
  putPerson: function(person) {
    api.putMyInfo(person).then(id => {
      this.setData({
        person: person
      });
      util.toast('更新成功！');
    }).catch(err => {
      o2Api.o2Error(err);
      //this.loadPersonInfo();
    })
  },
  tapDialogLogoutButton: function(event) {
    this.setData({
      showLogoutDialog: false
    })
    if (event.detail.index == 1) {
      api.logout().then(res => {
        console.log('登出', res);
        wx.removeStorageSync('who');
        wx.removeStorageSync('cookie');
        wx.redirectTo({
          url: '../login/login'
        });
      }).catch(err => {
        console.log('登出错误', err);
        wx.removeStorageSync('who');
        wx.removeStorageSync('cookie');
        wx.redirectTo({
          url: '../login/login'
        });
      })
    }
   
  }
})