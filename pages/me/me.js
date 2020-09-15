
let util = require('../../utils/util.js')
const api = require('../../utils/o2Api.js');
const o2Api = require('../../utils/o2Api.js');

Page({
  data: {
    showDialog: false,
    dialogLabel: '',
    dialogValue: '',
    dialogParam: '',
    avatarUrl: '',
    person: {}
  },
  onLoad: function () {
    
    //获取用户信息
     api.me().then(info => {
       this.setData({
         person: info
       });
     }).catch(err => {
       api.o2Error(err);
     })
  },
  onShow: function() {
    this.avatar();  
  },
  //获取头像文件
  avatar: function() {
    var who = wx.getStorageSync('who');
    var token = '';
    if (who && who.token) {
      token = who.token;
    }
    var url = api.myAvatarUrl();
    var _self = this;
    wx.downloadFile({
      url: url,
      header: {
        'x-token': token
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
  bindTapAvatar: function(event) {
    wx.navigateTo({
      url: './cropper-avatar',
    });
  },
  bindTapLine: function(event) {
    console.log(event);
    let param = event.currentTarget.dataset.param;
    if (!param) {
      return;
    } else if (param == 'mail') {
      var value = this.data.person.mail;
      var label = '邮件地址';
    } else if (param == 'mobile') {
      var value = this.data.person.mobile;
      var label = '手机号码';
    } else if (param == 'officePhone') {
      var value = this.data.person.officePhone;
      var label = '办公电话';
    } else if (param == 'signature') {
      var value = this.data.person.signature;
      var label = '个人签名';
    }
    this.setData({
      showDialog: true,
      dialogLabel: label,
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
      var person = this.data.person;
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
    })
  }
})