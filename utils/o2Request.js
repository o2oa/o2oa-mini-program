let app = getApp();

function request(method, url, param, isShowLoading) {
  //返回一个Promise对象
  return new Promise(function(resolve, reject) {
    if (isShowLoading) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
    }
    wx.request({
      url: url,
      method: method,
      data: param,
      header: {
        'content-type': 'application/json',
        'cookie': wx.getStorageSync('cookie')
      },
      success: function(res) {
        // 保存登录返回的cookie
        if (res.header['Set-Cookie']) {
          wx.setStorage({
            key: 'cookie',
            data: res.header['Set-Cookie'],
          })
        }
        console.log('接口：' + url, ' 参数：', param, '\n返回值：', res.data)
        if (isShowLoading) {
          wx.hideLoading();
        }
        if (res.data.type == 'success') { // 接口正常返回
          resolve(res.data.data);
        } else { // 出现异常
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          });
          reject(res.data);
        }
      },
      fail: function(res) {
        wx.hideLoading();
        console.log('请求异常 接口：' + url, ' 参数：', param, '\n返回值：', res)
        wx.showToast({
          title: '请求异常',
          icon: 'none',
          duration: 2000
        });
        reject(res);
      }
    });
  });
}

//设置应用地址到存储中
function setDistribute(distribute) {
  var webServer = distribute.webServer || {}
  wx.setStorage({
    key: 'webServer',
    data: webServer,
  });
  var assembles = distribute.assembles || {}
  wx.setStorage({
    key: 'assembles',
    data: assembles,
  });
}

// 获取模块的baseUrl
function getO2AssembleUrl(contextName) {
  var assemble = wx.getStorageSync('assembles')[contextName] || {host: app.globalData.o2oa.centerHost, port: app.globalData.o2oa.centerPort, context: "/"+contextName};
  return  app.globalData.o2oa.httpProtocol + "://" + assemble["host"] + ":" + assemble["port"]+ assemble["context"];
}



// 中心服务器获取
function o2oaCenterUrl() {
  return  app.globalData.o2oa.httpProtocol + "://" + app.globalData.o2oa.centerHost + ":" + app.globalData.o2oa.centerPort + app.globalData.o2oa.centerContext + "/jaxrs/distribute/webserver/assemble/source/" + app.globalData.o2oa.centerHost;
}

//认证模块
function o2oaOrganizationAuthenticationBaseUrl() {
    return getO2AssembleUrl('x_organization_assemble_authentication');
}

//cms模块
function o2oaCmsServiceBaseUrl() {
  return getO2AssembleUrl('x_cms_assemble_control');
}
//热点图片模块
function o2oaHotPicServiceBaseUrl() {
  return getO2AssembleUrl('x_hotpic_assemble_control');
}
//文件管理模块
function o2oaFileServiceBaseUrl() {
  return getO2AssembleUrl('x_file_assemble_control');
}

// get请求
function get(path, param = {}, isShowLoading = true) {
  return request("GET", path, param, isShowLoading);
}

// post请求
function post(path, param = {}, isShowLoading = true) {
  return request("POST", path, param, isShowLoading);
} 

// PUT 请求
function put(path, param = {}, isShowLoading = true) {
  return request("PUT", path, param, isShowLoading);
}

// DELETE 请求
function deleteReq(path, param = {}, isShowLoading = true) {
  return request("DELETE", path, param, isShowLoading);
}

module.exports = {
  get: get,
  post: post,
  put: put,
  delete: deleteReq,
  o2oaOrganizationAuthenticationBaseUrl: o2oaOrganizationAuthenticationBaseUrl,
  o2oaCenterUrl: o2oaCenterUrl,
  setDistribute: setDistribute,
  o2oaCmsServiceBaseUrl: o2oaCmsServiceBaseUrl,
  o2oaHotPicServiceBaseUrl: o2oaHotPicServiceBaseUrl,
  o2oaFileServiceBaseUrl: o2oaFileServiceBaseUrl
}
