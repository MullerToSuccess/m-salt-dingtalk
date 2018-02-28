import { Component } from "refast";
// import Refast  from 'refast';
import { Router, Route, IndexRoute, hashHistory } from "react-router";
//引入echarts和react-fot-react:
import echarts from "echarts/lib/echarts";
import ReactEchartsCore from "echarts-for-react/lib/core";
import { DDReady } from "../../app/ding";
import axios from "axios";
import mEchart from "components/echart";
import Info from "components/info";
import { render, Link } from "react-dom";
import Toast from "saltui/lib/Toast";
import Button from "saltui/lib/Button";
// import TabBar from 'saltui/lib/TabBar';
import {
  Group,
  PasswordInput,
  TabBar,
  Table,
  Popup,
  CalendarField,
  Scroller,
  ButtonGroup
} from "saltui";
import { Mask, Collapse } from "saltui";
import Time from "salt-icon/lib/Time";
import Plus from "salt-icon/lib/Plus";
// import PageDemo from 'pages/demo';
import "./PageHome.less";
// const customHistory = hashHistory;
import logic from "./logic";
import { GLOBALS } from "../../app/variables";
const Panel = Collapse.Panel;
const basePath = window._basePath;
const companyId = window._companyId;
const agentId = window._agentId;
const defaultItems = [];
const moreItems = [];
//defalut的popup的表单数据：
const defaultPopup = {
  cate: "公司",
  cateContent: "爱途享",
  startDate: "2017-12-08",
  endDate: "2017-12-09",
  maccord: "订单",
  year:2017,
  quarter:'第一季度',
  month:1,
  companyId:1027,
  type:'Ap_CloseBill'
};
export default class PageHome extends Component {
  //组件加载后：
  //1：初始化我们的组件：echart， table， tabItems 等
  //2：调用钉钉api，获取所有的要用到钉钉的接口
  componentDidMount() {
    //接口：links/echarts/echarts!showEchartsDataByNameForMobile?vo.name=sales_data?company_id=1027 //指定参数限制
    this.dispatch("fetchEchartOption", {"vo.id":10,"vo.type":1}); //获取echart
    this.dispatch("fetchTabItems", 10248); //获取权限的菜单的item;
    this.dispatch("fetchDataAccord");//获取order的类型
    this.dispatch("fetchDataCompany");//获取公司
    this.dispatch("fetchDataDepartment");//获取部门
    DDReady.then(dd => {
      const tt = this;
      //获取code:
      dd.biz.navigation.setRight({
        show: true, //控制按钮显示， true 显示， false 隐藏， 默认true
        control: true, //是否控制点击事件，true 控制，false 不控制， 默认false
        text: "过滤", //控制显示文本，空字符串表示显示默认文本
        onSuccess: function(result) {
          // tt.clickFetchOrganization;
          tt.instance = Popup.show(tt.getContent(), {
            animationType: "slide-left",
            onMaskClose: function() {
              //popup关闭后的回调：拿到所有的筛选的参数1：订单....；2：公司or部门..3：时间（long）
              //然后通过接口查询this.dispatch();
            }
          });
        },
        onFail: function(err) {}
      });
      if (!GLOBALS.isAuth) {
        //如果没有验证
        dd.runtime.permission.requestAuthCode({
          corpId: dd.config.corpId,
          onSuccess: function(result) {
            //异步请求登录：
            // alert('basePath: '+basePath);
            alert( basePath +
              "/dingtalk/user-info!" +
              // 'loadUserInfo?code='+result.code+'&companyId='+dd.config.corpId)
              "loadUserInfo?code=" +
              result.code +
              "&companyId=" +
              companyId +
              "&agentId=" +
              agentId);
            axios
              .get(
                basePath +
                  "/dingtalk/user-info!" +
                  // 'loadUserInfo?code='+result.code+'&companyId='+dd.config.corpId)
                  "loadUserInfo?code=" +
                  result.code +
                  "&companyId=" +
                  companyId +
                  "&agentId=" +
                  agentId
              )
              .then(res => {
                let thisUser = res.data;
                let tabItems;
                alert(JSON.stringify(res.data));
                if (res.data.success) {
                  // this.dispatch("fetchTabItems", 10248);
                  //用户在平台验证登录后获取模块的权限等：
                  alert("验证成功，欢迎" + thisUser.userId + "登录！");
                  tt.dispatch("fetchEchartOption");
                  tt.dispatch("fetchTabItems", thisUser.userId);
                  GLOBALS.isAuth = true;
                } else {
                  alert("验证失败！");
                }
              })
              .catch(err => {
                alert(err);
              });
          },
          onFail: function(err) {
            alert("res failed");
          }
        });
      } else {
        alert('已经登录认证222222222');
        tt.dispatch("fetchEchartOption");
        tt.dispatch("fetchTabItems");
      }

      dd.biz.navigation.setTitle({
        title: "排行榜",
        onSuccess: function(data) {
          /*alert('dd is ok')*/
        },
        onFail: function(err) {
          log.e(JSON.stringify(err));
        }
      });
    });
  }
  constructor(props, context) {
    super(props, logic);
    // this.context.router;
    this.state = {
      mode: "month",
      maskvisible: false,
      activeIndex: 0,
      visible: false,
      keyword: 1,
      // value: '2016-01-02',
      value: {
        startDate: "2016-01-02",
        startDateType: "AM",
        endDate: "2016-01-03",
        endDateType: "PM"
      },
      accord: [],
      //标记popup中的button的style：
      cateIndex: 0,
      cateContentIndex: 0,
      dateIndex: 0,
      accordIndex: 0,
      popOptions: {
        //筛选的选项
        cate: "公司",
        cateContent: "爱途享",
        startDate: "2017-12-08",
        endDate: "2017-12-09",
        maccord: "订单",
        year:2017,
        quarter:'第一季度',
        month:1,
        companyId:1027,
        type:'Ap_CloseBill'
      },
      popClassCotent: "公司", //默认：公司List
      order: "订单",
      organization: "公司",
      date: "2018.1.3", //时间date:存长整型
      //公司，部门，业务员等的接口通过后台接口获得：
      companyList: [], //fetch的公司列表
      departmentList: [], //fetch的部门的列表
      clientList: [], //fetch的客户的列表
      salesList: [], //fetch的业务员的列表
      productList: [], //fetch的产品的列表
      productCate: [], //fetch的产品分类的列表
      option: {}, //存我们的echart的所有配置选项
      defaultItems: [], //存放我们的权限菜单的tabItems
      moreItems: [],
      data: {
        data: [
          {
            email: "xw@abc.com",
            nameId: "是不会变得说不出街道办事处比较说的ng",
            name: "小王",
            cityId: "bj",
            city: "北京东路的日子无与伦比的美丽",
            sex: "女"
          },
          {
            email: "xl@abc.com",
            nameId: "xiaoli",
            name: "小李",
            cityId: "hz",
            city: "杭州",
            sex: "男"
          },
          {
            email: "xl@abc.com",
            nameId: "xiaoli",
            name: "小李",
            cityId: "hz",
            city: "杭州",
            sex: "男"
          },
          {
            email: "xl@abc.com",
            nameId: "xiaoli",
            name: "小李",
            cityId: "hz",
            city: "杭州",
            sex: "男"
          },
          {
            email: "xl@abc.com",
            nameId: "xiaoli",
            name: "小李",
            cityId: "hz",
            city: "杭州",
            sex: "男"
          },
          {
            email: "xl@abc.com",
            nameId: "xiaoli",
            name: "小李",
            cityId: "hz",
            city: "杭州",
            sex: "男"
          },
          {
            email: "xl@abc.com",
            nameId: "xiaoli",
            name: "小李",
            cityId: "hz",
            city: "杭州",
            sex: "男"
          },
          {
            email: "xl@abc.com",
            nameId: "xiaoli",
            name: "小李",
            cityId: "hz",
            city: "杭州",
            sex: "男"
          }
        ]
      },
      columns: [
        { dataKey: "city", title: "单位", align: "center" },
        { dataKey: "name", title: "销售", align: "center" },
        { dataKey: "email", title: "同比", align: "center" },
        { dataKey: "email", title: "环比", align: "center" }
      ]
    };
    //绑定事件到组件：
    this.showMask = this.showMask.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clickFetchAccord = this.clickFetchAccord.bind(this);
    this.clickFetchOrganization = this.clickFetchOrganization.bind(this);
    this.clickSetAccord = this.clickSetAccord.bind(this);
    this.clickSetOrganization = this.clickSetOrganization.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clickSetContent = this.clickSetContent.bind(this);
    this.subReset = this.subReset.bind(this);
    this.subPop = this.subPop.bind(this);
    // this.onOk = this.onOk.bind(this);
  }
  //在接受props之前修改组件的state：
  // componentWillReceiveProps(nextProps) {
  //   console.log('实时获取option:', nextProps);
  // }
  //判断是否组件重新render
  //   shouldComponentUpdate(nextProps,nextState){
  //     if(nextState.option == this.state.option){
  //       alert('一样');
  //       return false
  //     }else{
  //       alert('option变了')
  //     }
  // }
  showMask() {
    this.setState({
      maskvisible: true
    });
  }

  handleWillHide() {
    console.log("mask will hide");
    // 如果返回false 则Mask是不能关闭的
    // return false;
  }

  handleDidHide() {
    console.log("mask did hide");
  }

  handleClick(options) {
    Toast.show(options);
  }
  handleChange(args) {
    console.log(args.mode);
    console.log(22222222222, this);
    //
    // this.setState(Object.assign(this.state.popOptions,this.state.popOptions,{ accord: option }), console.log(this.state.popOptions))
    this.setState(
      {
        mode: args.mode,
        dateIndex: args.index
      },
      () => this.instance.update(this.getContent())
    );
    // switch
  }
  //重置popup的表单提交
  subReset() {
    //手动重新取一遍数据填到默认的值：

    // Popup.hide();
    this.setState(
      {
        popOptions: defaultPopup
      },
      alert(JSON.stringify(this.state.popOptions))
    );
  }
  //提交表单的查询的参数数据
  subPop(options) {
    //获取更新后的source数组：
    // this.setState({
    //   activeIndex:2
    // });
    alert(JSON.stringify(this.state.popOptions));
    //通过提交的条件获取新的数据：
    //过滤的参数：vo.name:查的表 + company_id:公司Id + year: 年份 + month  + quarter
    // + 订单类型：订单，收款，发票，发货

    this.dispatch('fetchDataFilter', 
    {'vo.name':'sales_data',
    'company_id':1027,
    // 'year':2017,
    // 'type':this.state.popOptions.type,
    'startTime':this.state.popOptions.startDate,
    'endTime':this.state.popOptions.endDate
  });
    Popup.hide();
  }
  clickFetchAccord() {
    //请求getAccord接口：
    
    const accord = this.state.accord;
    console.log(22222, accord);
    //根据返回后的数据：
    Popup.show(
      <div className="demo-popup-container-2">
        {accord.map(item => (
          <div className="t-LH44 t-FBH t-FBAC">
            <div
              className="t-FB1 t-PL10"
              onclick={this.clickSetAccord.bind(this, item.name)}
            >
              {item.name}
              {item.type ? `(${item.type})` : ""}
            </div>
          </div>
        ))}
      </div>,
      {
        animationType: "slide-down"
      }
    );
  }
  //popup筛选条件中设置的点击事件

  //1：为每一个popUp里面的btn都设置改变组件中state的属性的方法:
  clickSetAccord(args) {
    // const ref1 = ReactDOM.findDOMNode(this.refs.ref1);//取到真实的dom
    // console.log(ref1);
    console.log(5555555,this.state.accord);
    const contentList = this.state[args.name];
    this.setState(
      Object.assign(this.state.popOptions, this.state.popOptions, {
        cate: args.cname
      }),
      console.log(this.state.popOptions)
    );
    this.setState(
      {
        order: "name",
        popClassCotent: args.cname,
        cateIndex: args.index
        // 'popOptions.cate':args.cname
      },
      () => this.instance.update(this.getContent(this.state[args.name]))
    ); //异步setState后回调问题
    //请求该name下的接口：
  }
  //2：设置具体的公司或者客户名：
  clickSetContent(args) {
    this.setState(
      Object.assign(this.state.popOptions, this.state.popOptions, {
        cateContent: args.name,
        companyId:1027
      }),
      console.log(this.state.popOptions)
    );
    this.setState(
      {
        cateContentIndex: args.index,
        cateContent: args.name //具体的某个公司或者客户名等
      },
      () => this.instance.update(this.getContent())
    );
  }
  //3：设置依据：订单，发票；
  clickSetOrganization(args) {
    //修改state中的对象：
    //Object.assign 浅拷贝的问题：
    this.setState(
      Object.assign(this.state.popOptions, this.state.popOptions, {
        maccord: args.mode,
        type:args.type
      }),
      console.log(this.state.popOptions)
    );
    this.setState({ accordIndex: args.index }, () =>
      this.instance.update(this.getContent())
    );
  }

  //获取popup的内容以及更新
  getContent(popContentList) {
    //时间选项的属性：
    const props = {
      className: "calendar-field-demo myCalender",
      label: "日期区间",
      placeholder: ["开始时间", "结束时间"],
      required: false,
      multiLine: true,
      layout: "v",
      type: this.state.mode,
      singleMode: false,
      // formatter: 'yyyy-MM-dd',
      showWeek: false,
      showDateType: false,
      showHalfDay: true,
      topPanelTitle: "title",
      value: this.state.value,
      tip: "有年，季度，月三种模式可供选择",
      readOnly: false,
      // animationType: 'slideLeft',
      onOk: this.onOk.bind(this), //选择确定后的触发事件
      showTopPanel: true
      // formatter: 'yyyy.MM.dd',
    };

    const options = {
      cate: "公司",
      cateContent: "爱途享科技",
      startDate: "2017-12-08",
      endDate: "2017-12-09",
      maccord: "订单"
    };
    const myHeader1 = <span className="page-pop-title">分类</span>;
    const myHeader2 = (
      <span className="page-pop-title">{this.state.popClassCotent}</span>
    );
    const myHeader3 = <span className="page-pop-title">时间</span>;
    const myHeader4 = <span className="page-pop-title">依据</span>;
    //分类有公司，部门，客户，业务员，产品，产品分类等：
    //分别根据不同的接口访问后台接口获取list：
    const contentList = popContentList
      ? popContentList
      : this.state.companyList; //默认是用的companyList
    const accrodList = this.state.accord; 
    console.log('accord:',this.state.accord);
    const content = (
      // <Scroller mouseWheel className='page'>
      <div className="demo-popup-container-2 myPop">
        <Collapse
          defaultActiveKey={["p-cate", "p-content", "p-date", "p-accord"]}
        >
          <Panel key="p-cate" header={myHeader1} className="pop-myPanel">
            <div className="page-pop-classify">
              <Button
                className="page-btn-setFilter"
                type={this.state.cateIndex == 0 ? "primary" : "secondary"}
                onClick={this.clickSetAccord.bind(this, {
                  name: "companyList",
                  cname: "公司",
                  index: 0
                })}
              >
                公司
              </Button>
              <Button
                className="page-btn-setFilter"
                type={this.state.cateIndex == 1 ? "primary" : "secondary"}
                onClick={this.clickSetAccord.bind(this, {
                  name: "departmentList",
                  cname: "部门",
                  index: 1
                })}
              >
                部门
              </Button>
              <Button
                className="page-btn-setFilter"
                type={this.state.cateIndex == 2 ? "primary" : "secondary"}
                onClick={this.clickSetAccord.bind(this, {
                  name: "clientList",
                  cname: "客户",
                  index: 2
                })}
              >
                客户
              </Button>
              <Button
                className="page-btn-setFilter"
                type={this.state.cateIndex == 3 ? "primary" : "secondary"}
                onClick={this.clickSetAccord.bind(this, {
                  name: "salesList",
                  cname: "业务员",
                  index: 3
                })}
              >
                业务员
              </Button>
              <Button
                className="page-btn-setFilter"
                type={this.state.cateIndex == 4 ? "primary" : "secondary"}
                onClick={this.clickSetAccord.bind(this, {
                  name: "productList",
                  cname: "产品",
                  index: 4
                })}
              >
                产品
              </Button>
              <Button
                className="page-btn-setFilter"
                type={this.state.cateIndex == 5 ? "primary" : "secondary"}
                onClick={this.clickSetAccord.bind(this, {
                  name: "produceCate",
                  cname: "产品分类",
                  index: 5
                })}
              >
                产品分类
              </Button>
            </div>
          </Panel>
          <Panel key="p-content" header={myHeader2} className="pop-myPanel">
            <div className="page-pop-corp">
              {contentList.map((item, index) => (
                <Button
                  className="page-btn-setFilter"
                  onClick={this.clickSetContent.bind(this, {
                    name: item.branch_company_name || item.c_dep_full_name,
                    id: item.company_id || item.c_dep_code,
                    index: index
                  })}
                  type={
                    this.state.cateContentIndex == index
                      ? "primary"
                      : "secondary"
                  }
                >
                  {item.branch_company_name || item.c_dep_full_name}
                </Button>
              ))}
            </div>
          </Panel>

          <Panel key="p-date" header={myHeader3} className="pop-myPanel">
            <div className="page-pop-date">
              <br />
              <Group>
                <Group.List>
                  <CalendarField {...props} />
                </Group.List>
              </Group>
              <Button
                className="btn-mode"
                type={this.state.dateIndex == 0 ? "primary" : "secondary"}
                display="inline"
                onClick={this.handleChange.bind(this, {
                  mode: "year",
                  index: 0
                })}
              >
                年
              </Button>
              <Button
                className="btn-mode"
                type={this.state.dateIndex == 1 ? "primary" : "secondary"}
                display="inline"
                onClick={this.handleChange.bind(this, {
                  mode: "month",
                  index: 1
                })}
              >
                季
              </Button>
              <Button
                className="btn-mode"
                type={this.state.dateIndex == 2 ? "primary" : "secondary"}
                display="inline"
                onClick={this.handleChange.bind(this, {
                  mode: "month",
                  index: 2
                })}
              >
                月
              </Button>
            </div>
          </Panel>

          <Panel key="p-accord" header={myHeader4} className="pop-myPanel">
            <div className="page-pop-category">
                {accrodList.map((item, index) => (
                  <Button
                  className="page-btn-setFilter"
                  type={this.state.accordIndex == index ? "primary" : "secondary"}
                  onClick={this.clickSetOrganization.bind(this, {
                    mode: item.name,
                    index: index,
                    type: item.type
                  })}
                >
                 { item.name }
                </Button>
              ))}

             
            </div>
          </Panel>
        </Collapse>

        <div className="section-content">
          <Button.Group>
            <Button
              type="secondary"
              display="banner"
              onClick={this.subReset.bind(this)}
            >
              重置
            </Button>
            <Button
              type="primary"
              display="banner"
              onClick={this.subPop.bind(this, options)}
            >
              确定
            </Button>
          </Button.Group>
        </div>
      </div>
      // </Scroller>
    );
    return content;
  }
  clickFetchOrganization() {
    //请求getOrganization的接口：
    console.log(this);
    this.instance = Popup.show(this.getContent(), {
      animationType: "slide-left",
      onMaskClose: function() {
        //popup关闭后的回调：拿到所有的筛选的参数1：订单....；2：公司or部门..3：时间（long）
        //然后通过接口查询this.dispatch();
      }
    });
    // this.dispatch('fetchDataOrganization');
  }

  onChartReadyCallback() {
    console.log("chart is ready.");
  }
  //选择时间控件选择后触发事件：
  onOk(value) {
    this.setState(
      Object.assign(this.state.popOptions, this.state.popOptions, {
        startDate: value.startDate,
        endDate: value.endDate
      }),
      console.log(this.state.popOptions)
    );
    this.setState(
      {
        value
      },
      () => this.instance.update(this.getContent())
    ); //更新popup的content
  }
  render() {
    const t = this;
    const onChange = (activeIndex, path) => {
      // 这里是触发每个item之后的回调，会返回当前点击的item的index 值
      t.context.router.push(path);
    };
    // const { option = [], error } = t.state;
    // const Tag = option ? mEchart : Info;
    const { option, defaultItems } = t.state; //用到组件中的在state中取过来
    return (
      <div className="page-home">
        <Mask
          visible={t.state.maskvisible}
          onWillHide={t.handleWillHide.bind(t)}
          onDidHide={t.handleDidHide.bind(t)}
          opacity={0.4}
        />

        <div className="page-graph">
          <div style={{ padding: "10px" }}>
            <Button
              className="page-button"
              onClick={t.clickFetchAccord.bind(t)}
            >
              {this.state.popOptions.maccord}
            </Button>
            <Button
              className="page-button"
              onClick={t.clickFetchOrganization.bind(t)}
            >
              {this.state.popOptions.cateContent}
            </Button>
            <Button className="page-button" onClick={t.handleClick}>
              {this.state.popOptions.startDate}
            </Button>
            <div className="demo" />
          </div>

          <ReactEchartsCore
            className="page-echart"
            echarts={echarts}
            option={t.state.option}
            style={{ height: "300px", width: "100%" }}
            lazyUpdate={true}
            onChartReady={this.onChartReadyCallback}
          />
        </div>

        <div>
          <Table columns={t.state.columns} data={t.state.data} leftFixed={0} />
        </div>
        <div>
          <TabBar
            tabBarStyle={{}}
            activeIndex={t.state.activeIndex}
            onChange={onChange}
            iconHeight={24}
            cIconHeight={24}
            items={t.state.defaultItems}
          />
        </div>
      </div>
    );
  }
}
PageHome.contextTypes = {
  router: Object
};
