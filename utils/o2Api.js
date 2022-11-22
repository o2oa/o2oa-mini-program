const o2Request = require('/o2Request.js');
const util = require('/util.js');

let setDistribute = (distribute) => o2Request.setDistribute(distribute);

// cms 移动端 html地址
let cmsWebUrl = (id) => o2Request.getO2WebBaseUrl() + '/x_desktop/cmsdocMobile.html?id=' + id;
// 未完成的工作表单打开地址
let workWebUrl = (work) => o2Request.getO2WebBaseUrl() + '/x_desktop/workmobilewithaction.html?workid=' + work;
// 草稿 工作地址
let workDraftUrl = (draft) => o2Request.getO2WebBaseUrl + '/x_desktop/workmobilewithaction.html?draft=' + draft;
//工作表单打开地址 已结束 
let workCompletedWebUrl = (workcompletedid) => o2Request.getO2WebBaseUrl() + '/x_desktop/workmobilewithaction.html?workcompletedid=' + workcompletedid;
//论坛帖子打开地址 subjectId：帖子id page：评论页码
let bbsWebUrl = (subjectId, page) => o2Request.getO2WebBaseUrl() + '/x_desktop/forumdocMobile.html?id=' + subjectId + '&page=' + page;

// 中心服务器
let centerServer = () => o2Request.get(o2Request.o2oaCenterUrl());

/////////////////////////////认证中心///////////////////////////////////
// 认证
let who = () => o2Request.get(o2Request.o2oaOrganizationAuthenticationBaseUrl() + '/jaxrs/authentication');
//param: credential=xxxx,password=xxxx
let login = (param) => o2Request.post(o2Request.o2oaOrganizationAuthenticationBaseUrl() + '/jaxrs/authentication', param);
//登出
let logout = () => o2Request.delete(o2Request.o2oaOrganizationAuthenticationBaseUrl() + '/jaxrs/authentication');
// 获取 rsa publish key
let rsaPublishKey =()=> o2Request.get(o2Request.o2oaOrganizationAuthenticationBaseUrl() + '/jaxrs/authentication/captchaRSAPublicKey');


//////////////////////////cms 信息中心//////////////////////////////

//热点图片列表 默认取前5条
let hotPicList = () => o2Request.put(o2Request.o2oaHotPicServiceBaseUrl() + '/jaxrs/user/hotpic/filter/list/page/1/count/5', {}, false);
// 热电图片url地址
let hotPicUrl = (picId) => o2Request.o2oaFileServiceBaseUrl() + '/jaxrs/file/'+picId+'/download/stream';

//cms 分页获取文档列表
let cmsDocumentFilterList = (lastId, pageSize, param) => o2Request.put(o2Request.o2oaCmsServiceBaseUrl() + '/jaxrs/document/filter/list/'+lastId+'/next/'+pageSize, param);
//cms 附件下载地址
let cmsAttachementUrl = (attId) => o2Request.o2oaCmsServiceBaseUrl() + '/jaxrs/fileinfo/download/document/'+attId;

/////////////////////流程 //////////////////////////////

// 流程应用
let applicationList = () => o2Request.get(o2Request.o2oaProcessServiceBaseUrl() + '/jaxrs/application/list/complex');
// 获取当前用户在指定流程中可启动流程的身份.
let listAvailableIdentityWithProcess = (processId) => o2Request.get(o2Request.o2oaProcessServiceBaseUrl() + '/jaxrs/process/list/available/identity/process/'+processId);
// 启动草稿
let createDraft = (processId, body) => o2Request.post(o2Request.o2oaProcessServiceBaseUrl() + '/jaxrs/draft/process/'+processId, body);
// 启动流程
let createWork = (processId, body) => o2Request.post(o2Request.o2oaProcessServiceBaseUrl() + '/jaxrs/work/process/'+processId, body);

// 待办列表
let taskList = (lastId, pageSize) => o2Request.get(o2Request.o2oaProcessServiceBaseUrl() + '/jaxrs/task/list/'+lastId+'/next/'+pageSize);
//已办列表
let taskCompletedList = (lastId, pageSize) => o2Request.get(o2Request.o2oaProcessServiceBaseUrl() + '/jaxrs/taskcompleted/list/'+lastId+'/next/'+pageSize);
//待阅列表
let readList = (lastId, pageSize) => o2Request.get(o2Request.o2oaProcessServiceBaseUrl() + '/jaxrs/read/list/'+lastId+'/next/'+pageSize);
//已阅列表
let readCompletedList = (lastId, pageSize) => o2Request.get(o2Request.o2oaProcessServiceBaseUrl() + '/jaxrs/readcompleted/list/'+lastId+'/next/'+pageSize);

//工作附件下载地址
let workAttachmentUrl = (attId, workId) => o2Request.o2oaProcessServiceBaseUrl() + '/jaxrs/attachment/download/'+attId+'/work/'+workId;
//完成工作的附件下载地址
let workCompletedAttachementUrl = (attId, workcompletedId) => o2Request.o2oaProcessServiceBaseUrl() + '/jaxrs/attachment/download/'+attId+'/workcompleted/'+workcompletedId;


/////////////////////////论坛///////////////////////////
//帖子附件
let bbsAttachementUrl = (attId) => o2Request.o2oaBBSServiceBaseUrl() + '/jaxrs/attachment/download/' + attId;

////////////////////////人员//////////////////////////
//个人信息
let me = () => o2Request.get(o2Request.o2oaPersonalServiceBaseUrl() + '/jaxrs/person');
//个人用户的头像地址
let myAvatarUrl = () => o2Request.o2oaPersonalServiceBaseUrl() + '/jaxrs/person/icon';
//更新个人信息
let putMyInfo = (person) => o2Request.put(o2Request.o2oaPersonalServiceBaseUrl() + '/jaxrs/person', person);
// 上传当前用户头像的 上传地址
let uploadMyAvatarUrl = () => o2Request.o2oaPersonalServiceBaseUrl() + '/jaxrs/person/icon';
// 发送短信 获取短信验证码
let sendSms = (mobile) => o2Request.get(o2Request.o2oaPersonalServiceBaseUrl() + '/jaxrs/regist/code/mobile/' + mobile);
//注册人员
let register = (form) => o2Request.post(o2Request.o2oaPersonalServiceBaseUrl() + '/jaxrs/regist', form);
//是否开启注册功能 "data": {"value": "disable"}  disable,captcha,code
let registerMode = () => o2Request.get(o2Request.o2oaPersonalServiceBaseUrl() + '/jaxrs/regist/mode');



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
  cmsWebUrl,
  workWebUrl,
  workDraftUrl,
  workCompletedWebUrl,
  bbsWebUrl,
  workAttachmentUrl,
  workCompletedAttachementUrl,
  cmsAttachementUrl,
  bbsAttachementUrl,
  who,
  login,
  logout,
  rsaPublishKey,
  hotPicList,
  hotPicUrl,
  cmsDocumentFilterList,
  taskList,
  taskCompletedList,
  readList,
  readCompletedList,
  applicationList,
  listAvailableIdentityWithProcess,
  createDraft,
  createWork,
  me,
  myAvatarUrl,
  uploadMyAvatarUrl,
  putMyInfo,
  sendSms,
  register,
  registerMode
}