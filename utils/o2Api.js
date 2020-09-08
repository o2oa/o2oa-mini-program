const o2Request = require('/o2Request.js');
const util = require('/util.js');

let setDistribute = (distribute) => o2Request.setDistribute(distribute);

// 中心服务器
let centerServer = () => o2Request.get(o2Request.o2oaCenterUrl());

// 认证
let who = () => o2Request.get(o2Request.o2oaOrganizationAuthentication() + '/jaxrs/authentication');
//param: credential=xxxx,password=xxxx
let login = (param) => o2Request.post(o2Request.o2oaOrganizationAuthentication() + '/jaxrs/authentication', param);


// 处理o2请求返回错误
function o2Error(err, optionsMessage = '请求失败') {
  if(err && err.message) {
    util.toast(err.message);
  }else {
    util.toast(optionsMessage);
  }
}

module.exports = {
  o2Error: o2Error,
  centerServer,
  setDistribute,
  who,
  login
}