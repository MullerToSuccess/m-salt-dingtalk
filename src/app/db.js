import nattyFetch from "natty-fetch";
import Toast from "saltui/lib/Toast";

import { urlPrefix, isDev } from "./variables";

// See https://github.com/Jias/natty-fetch for more details.
//1：定义接口模块，创建上下文


const context = nattyFetch.context({
  mockUrlPrefix: urlPrefix,
  urlPrefix,
  mock: isDev,
  // jsonp: [true, 'callback'],//使用jsonp格式跨域
  withCredentials: false, //跨域时false
  traditional: true,
  data: {
    _tb_token_: "" //统一接口传递的参数
  },
  timeout: 50000, //超时5s
  didFetch: () => Toast.hide(), //成功获取数据后的回调
  fit(response) {
    //返回json数据的适配
    let content = {};  
    if (response.success) {//现接口都为这种类型：
      //如果是数组格式的message直接返回整个数组：
      content = response.message;
      console.log(66,content);
      // response.message.map(function(item) {
      //   console.log('XINDE:',item);
      //   if (item.code == "LINKS") {
      //     content = item;
      //   }
      // });
    }else{
      content = response
    }
    return {
      success: true,
      content: content
    };
  }
});
//2：在上下文接口对象上定义接口
//User:
context.create("User", {
  getSomeInfo: {
    mockUrl: "query/getSomeInfo.json", //使用mock数据用于测试
    url: "dingtalk/query/getSomeInfo.json",
    willFetch() {
      Toast.show({
        type: "loading",
        content: "Loading"
      });
    }
  },
  getIcons: {
    mockUrl: "test",
    url: "test",
    data: {
      params: JSON.stringify({ dsds: 45 })
    }
  }
});
//Category:
context.create("Category", {
  getCategory: {
    mockUrl: "query/getSomeInfo.json", //使用mock数据用于测试
    url: "dingtalk/query/getSomeInfo.json",
    willFetch() {
      Toast.show({
        type: "loading",
        content: "Loading"
      });
    }
  }
});
//Option:
context.create("Option", {
  getEchartOption: {
    mockUrl: "query/echartOption.json",
    // url: "meris/pages/platform/mock/echartOption.text",
    url: "links/echarts/echarts!showEchartsData",
    willFetch() {
      Toast.show({
        type: "loading",
        content: "Loading"
      });
    }
  },
  getTabItems: {
    mockUrl: "query/tabItems.json",
    url: "meris/platform/platform!mobileLoadMenuItems",
    willFetch() {
      Toast.show({
        type: "loading",
        content: "Loading"
      });
    }
  },
  getEchartType: {
    mockUrl: "query/tabItems.json",
    url: "links/echarts/echarts!getFiltersDataByEDSAndEFDS",
    willFetch() {
      Toast.show({
        type: "loading",
        content: "Loading"
      });
    }
  }
});
//Data:
//获取需要的所有Table的数据：
context.create("Data", {
  //获取order类型
  getAccord: {
    mockUrl: "query/accord.json",
    url: "links/echarts/echarts!getFiltersDataByEDSAndEFDS",
    data: {
      "vo.name": "sales_data",
      "vo.efdsName":"type"
    },
    willFetch() {
      Toast.show({
        type: "loading",
        content: "Loading"
      });
    }
  },
  //获取组织
  getOrganization: {
    mockUrl: "query/organization.json",
    url: "links/echarts/echarts!getFiltersDataByEDSAndEFDS",
    data: {
      "vo.name": "sales_data",
      "vo.efdsName":"branch_company_name"
    },
    willFetch() {
      Toast.show({
        type: "loading",
        content: "Loading"
      });
    }
  },
  //获取部门
  getDepartment: {
    mockUrl: "query/organization.json",
    url: "links/echarts/echarts!getFiltersDataByEDSAndEFDS",
    data: {
      "vo.name": "sales_data",
      "vo.efdsName":"c_dep_full_name"
    },
    willFetch() {
      Toast.show({
        type: "loading",
        content: "Loading"
      });
    }
  },
  //获取公司
  getCompany: {
    mockUrl: "query/organization.json",
    url: "links/echarts/echarts!getFiltersDataByEDSAndEFDS",
    data: {
      "vo.name": "sales_data",
      "vo.efdsName":"branch_company_name"
    },
    willFetch() {
      Toast.show({
        type: "loading",
        content: "Loading"
      });
    }
  },
  //过滤条件获取：
  getFilterEchart: {
    mockUrl: "query/organization.json",
    url: "links/echarts/echarts!showEchartsDataByNameForMobile",
    willFetch() {
      Toast.show({
        type: "loading",
        content: "Loading"
      });
    }
  }
});
export default context.api; //输出上下文的所有接口
