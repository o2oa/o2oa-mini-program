const o2Request = require('/o2Request.js');
const util = require('/util.js');

let setDistribute = (distribute) => o2Request.setDistribute(distribute);

// 中心服务器
let centerServer = () => o2Request.get(o2Request.o2oaCenterUrl());

// 认证
let who = () => o2Request.get(o2Request.o2oaOrganizationAuthenticationBaseUrl() + '/jaxrs/authentication');
//param: credential=xxxx,password=xxxx
let login = (param) => o2Request.post(o2Request.o2oaOrganizationAuthenticationBaseUrl() + '/jaxrs/authentication', param);


//////////////////////////cms 信息中心//////////////////////////////

//热点图片列表 默认取前5条
let hotPicList = () => o2Request.put(o2Request.o2oaHotPicServiceBaseUrl() + '/jaxrs/user/hotpic/filter/list/page/1/count/5', {}, false);
//cms 分页获取文档列表
let cmsDocumentFilterList = (lastId, pageSize, param) => o2Request.put(o2Request.o2oaCmsServiceBaseUrl() + '/jaxrs/document/filter/list/'+lastId+'/next/'+pageSize, param);


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
  login,
  hotPicList,
  cmsDocumentFilterList
}