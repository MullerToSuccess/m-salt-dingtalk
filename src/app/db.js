import nattyFetch from 'natty-fetch';
import Toast from 'saltui/lib/Toast';

import { urlPrefix, isDev } from './variables';

// See https://github.com/Jias/natty-fetch for more details.
//1：定义接口模块，创建上下文
const context = nattyFetch.context({
  mockUrlPrefix: urlPrefix,
  urlPrefix,
  mock: isDev,
  // jsonp: [true, 'callback'],//使用jsonp格式跨域
  withCredentials: false,//跨域时false
  traditional: true,
  data: {
    _tb_token_: '',//传递的参数
  },
  timeout: 5000,//超时5s
  didFetch: () => Toast.hide(),//成功获取数据后的回调
  fit(response) {//返回json数据的适配
    return {
      success: response.success,
      content: response.content,
      error: {
        errorMsg: response.errorMsg,
        errorCode: response.errorCode,
        errorLevel: response.errorLevel,
      },
    };
  },
});

//2：在上下文接口对象上定义接口
//User:
context.create('User', {
  getSomeInfo: {
    mockUrl: 'query/getSomeInfo.json',//使用mock数据用于测试
    url: 'dingtalk/query/getSomeInfo.json',
    willFetch() {
      Toast.show({
        type: 'loading',
        content: 'Loading',
      });
    },
  },
  getIcons:{
    mockUrl: 'test',
    url: 'test',
    data:{
      params:JSON.stringify({"dsds":45})
    }
  },
});
//Category:
context.create('Category', {
  getCategory: {
    mockUrl: 'query/getSomeInfo.json',//使用mock数据用于测试
    url: 'dingtalk/query/getSomeInfo.json',
    willFetch() {
      Toast.show({
        type: 'loading',
        content: 'Loading',
      });
    },
  }
});
//Option:
context.create('Option',{
  getEchartOption:{
    mockUrl: 'query/echartOption.json',
    url:'meris/pages/platform/mock/echartOption.json',
    willFetch() {
      Toast.show({
        type: 'loading',
        content: 'Loading',
      });
    },
  },
  getTabItems:{
    mockUrl: 'query/tabItems.json',
    url:'meris/pages/platform/mock/tabItems.json',
    willFetch() {
      Toast.show({
        type: 'loading',
        content: 'Loading',
      });
    },
  }
})
//Data:
//获取需要的所有Table的数据：
context.create('Data',{
  getAccord:{
    mockUrl: 'query/accord.json',
    url:'dingtalk/query/accord.json',
    data:{
      params:JSON.stringify({"typeId":1})
    },
    willFetch() {
      Toast.show({
        type: 'loading',
        content: 'Loading',
      });
    },
  },
  getOrganization:{
    mockUrl: 'query/organization.json',
    url:'query/organization.json',
    data:{
      params:JSON.stringify({"typeId":1})
    },
    willFetch() {
      Toast.show({
        type: 'loading',
        content: 'Loading',
      });
    },
  }
})
export default context.api;//输出上下文的所有接口
