// 接入参考
// https://open-doc.dingtalk.com/docs/doc.htm

const getDingtalkConfig = async () => {
    // 此方法返回钉钉 JSAPI 所需要的配置。默认读取 window._config对象 可自行修改
    return {
      agentId: window._config.agentid, // 必填，微应用ID
      corpId: window._config.corpId, //必填，企业ID
      timeStamp: window._config.timeStamp, // 必填，生成签名的时间戳
      nonceStr: window._config.nonceStr, // 必填，生成签名的随机串
      signature: window._config.signature, // 必填，签名
      jsApiList: apiList
    };
  };
  
  const apiList = [
    // 需要使用的jsapi列表，注意：不要带dd
    'runtime.info',
    'biz.contact.choose',
    'device.notification.confirm',
    'device.notification.alert',
    'device.notification.prompt',
    'biz.ding.post',
    'biz.util.openLink',
    'biz.navigation.setTitle',
    'biz.user.get',
    'biz.navigation.setRight',
    'runtime.permission.requestAuthCode'
  ];
  const dd = window.dd;
  if (!dd) {
    console.error(`window.dd为${dd}，请确认钉钉 API 是否加载/加载顺序正确`)
  }
  
  export const DDReady = new Promise((resolve, reject) => {
    getDingtalkConfig().then(data => {
      dd.config(data);
      dd.ready(function() {
        resolve(dd);//解决函数
      });
      dd.error(function(err) {
        alert('dd error: ' + JSON.stringify(err));
        reject(err);//拒绝函数
      });
    });
  });