//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.getNaviInfo()
     
  },
  // 获取菜单按钮（右上角胶囊按钮）的布局位置信息
  getNaviInfo: function() {
    let menuRect = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: (res) => {
        let naviInfo = this.globalData.naviInfo;
        naviInfo.naviHeight = res.statusBarHeight + menuRect.height + (menuRect.top - res.statusBarHeight) * 2;
        naviInfo.naviWidth = res.windowWidth;
        naviInfo.menuTop = menuRect.top;
        naviInfo.menuHeight = menuRect.height;
        naviInfo.menuWidth = menuRect.width;
        naviInfo.menuRight = res.width - menuRect.width - menuRect.left;
        naviInfo.statusBarHeight = res.statusBarHeight;
      },
    })
  },
  globalData: {
    userInfo: null,
    o2oa: {
      centerHost: "sample.o2oa.net",
      centerContext: "/x_program_center",
      centerPort: 443,
      httpProtocol: "https"
    },
    naviInfo: {
      naviHeight: 0,
      naviWidth: 0,
      menuTop: 0,
      menuHeight: 0,
      menuWidth: 0,
      menuRight: 0,
      statusBarHeight: 0,
    }
  }
})