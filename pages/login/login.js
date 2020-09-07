let util = require('../../utils/util.js')

Page({
  data: {
    name: '',
    password: '',
    nameFocus: true,
    passwordFocus: false
  },
  onLoad: function () {
     
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
    if (this.data.name.length < 3) {
      util.toast("请输入至少3位用户名！");
      return;
    }
    if (this.data.password.length == 0) {
      util.toast("请输入密码！");
      return;
    }
    if (this.data.password.length < 6) {
      util.toast("请输入至少6位密码！");
      return;
    }

    let param = {
      username: this.data.name,
      password: this.data.password
    }
    console.log(param);
    // api.login(param)
    //   .then(data => {
    //     util.toast('登录成功~');

    //     let eventChannel = this.getOpenerEventChannel();
    //     eventChannel.emit('loginSuccess', {
    //       data: this.data.name
    //     });

    //     wx.setStorage({
    //       key: 'name',
    //       data: this.data.name,
    //     })

    //     setTimeout(() => {
    //       wx.navigateBack({})
    //     }, 500)
    //   }).catch(data => {

    //   })
  }
})