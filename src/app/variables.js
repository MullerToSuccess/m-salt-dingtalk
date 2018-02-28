// 这里放置全局的变量
const isDev = __LOCAL__;
// const isDev  = '192.168.0.94:8080'
// const isDev = true;
const urlPrefix = isDev ? '/mock/' : '/';
// const urlPrefix = 'http://192.168.0.94:8080/dingtalk/';

export default {
  urlPrefix,
  isDev,
  // 这里放置全局的调用的URL
  URLS: {},
  //这里放全局的配置文件的json配置：
  GLOBALS:{
        isAuth:false,
        globalAccord:[{
          "name":"订单",
          "typeId":"1"
        },{
            "name":"发货单",
            "typeId":"2"
        },{
            "name":"发票",
            "typeId":"3"
        },{
            "name":"收款单",
            "typeId":"4"
        }]
  }
  
};
