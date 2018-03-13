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
import "./PageInoutput.less";
// const customHistory = hashHistory;
import logic from "./logic";
import { GLOBALS } from "../../app/variables";
const Panel = Collapse.Panel;
const defaultPopup = {
  cate: "公司",
  cateContent: "佳驰",
  startDate: "2017-12-08",
  endDate: "2017-12-09",
  maccord: "订单",
  year:2017,
  quarter:'第一季度',
  month:1,
  companyId:1027,
  type:'Ap_CloseBill',
  branchCompany:'',
  isAll:false,
  timeZone:'2017.1-2017.12'
};
export default class PageInoutput extends Component {
  componentDidMount() {
    this.dispatch('fetchTabItems');//获取权限的菜单的item;
    this.dispatch("fetchDataAccord");//获取order的类型
    this.dispatch("fetchDataCompany");//获取公司
    this.dispatch("fetchDataDepartment");//获取部门
    this.dispatch("fetchEchartOption", {
      'vo.name': 'input_output',
      'startTime': 1451577600000,
      'endTime': 1483200000000
    }); //获取echart
    this.dispatch("fetchDataTable",{
      startTime:1451577600000,
      endTime:1483200000000
    });//获取table：2016年
    
    //钉钉自身页面设置：
    DDReady.then((dd) => {
      const tt = this;
      dd.biz.navigation.setMenu({
                items : [
                    {
                        "id":"1",
                        "iconId":"file",
                        "text":"过滤",
                        "url": "/meris/pages/platform/images/icon_filter_mobile.png"
                    }
                ],
                onSuccess: function(data) {
           //点击过滤后
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
      dd.biz.navigation.setTitle({
        title: '投入产出',
        onSuccess: function(data) {
          /*alert('dd is ok')*/
        },
        onFail: function(err) {
            log.e(JSON.stringify(err));
        }
        });
    });
  }
      constructor(props,context) {
        super(props,logic);
        // this.context.router;
        this.state = {
          activeIndex:2,
          mode: "month",
          allItems:[],
          defaultItems:[],
          moreItems:[],
          option:{},
          popClassCotent: "公司",
          value: {
            startDate: "2016-01-02",
            startDateType: "AM",
            endDate: "2016-01-03",
            endDateType: "PM"
          },
          companyList: [], //fetch的公司列表
          departmentList: [], //fetch的部门的列表
          clientList: [], //fetch的客户的列表
          salesList: [], //fetch的业务员的列表
          productList: [], //fetch的产品的列表
          productCate: [], //fetch的产品分类的列表
          popOptions: {
            //筛选的选项
            cate: "公司",
            cateContent: "所有车间",
            startDate: "2016年",
            endDate: "2017-12-09",
            maccord: "全部物料",
            year:2017,
            quarter:'第一季度',
            month:1,
            companyId:1027,
            type:'Ap_CloseBill',
            branchCompany:'',
            isAll:false,
            timeZone:'2017.1-2017.12'
          },
          data: {
            data: [
            ]
          },
          columns: [    
            { dataKey: "branch_company_name", title: '公司', align: "center"},
            { dataKey: "c_inv_name", title: '存货名称', align: "center"},
            { dataKey: "c_inv_std", title: '存货规格', align: "center"},
            { dataKey: "lm", title: '同比', align: "center"},
            { dataKey: "ly", title: '环比', align: "center"},
            { dataKey: "ipo", title: '投产比', align: "center"},
            { dataKey: "qty", title: '生产数量', align: "center"},
            { dataKey: "base_qty_n", title: '子件基础用量', align: "center"},
            { dataKey: "base_qty_d", title: '母件基础用量', align: "center"}
          ]
        };  
        this.clickFetchAccord = this.clickFetchAccord.bind(this);
        this.clickFetchOrganization = this.clickFetchOrganization.bind(this);
        this.clickSetAccord = this.clickSetAccord.bind(this);
        this.clickSetOrganization = this.clickSetOrganization.bind(this);
        this.clickSetContent = this.clickSetContent.bind(this);
        this.subReset = this.subReset.bind(this);
        this.subPop = this.subPop.bind(this);    
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.timestampToTime = this.timestampToTime.bind(this);
      }
//时间戳转时间
timestampToTime(timestamp) {
  let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '.';
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
  return Y+M;
}
      //新加:::
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
    alert(JSON.stringify(this.state.popOptions));
    //通过提交的条件获取新的数据：
    //过滤的参数：vo.name:查的表 + company_id:公司Id + year: 年份 + month  + quarter
    // + 订单类型：订单，收款，发票，发货

    if(!this.state.popOptions.isAll){
      this.dispatch("fetchEchartOption", {
        'vo.name': 'input_output',
        'startTime': this.state.popOptions.startDate,
        'endTime': this.state.popOptions.endDate,
        'branch_company_name':this.state.popOptions.branchCompany
      }); //获取echart
      this.dispatch("fetchDataTable",{
        startTime:this.state.popOptions.startDate,
        endTime:this.state.popOptions.endDate,
        branch_company_name:this.state.popOptions.branchCompany,
      });//获取table：2016年
      Popup.hide();
    }else{
      this.dispatch("fetchEchartOption", {
        'vo.name': 'input_output',
        'startTime': this.state.popOptions.startDate,
        'endTime': this.state.popOptions.endDate
      }); //获取echart
      this.dispatch("fetchDataTable",{
        startTime:this.state.popOptions.startDate,
        endTime:this.state.popOptions.endDate
      });//获取table：2016年
      Popup.hide();
    }
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
              onClick={this.clickFetchType.bind(this, item)}
            >
            {item.name}
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
    if(!args.isAll){
      this.setState(
        Object.assign(this.state.popOptions, this.state.popOptions, {
          cateContent: args.name,
          companyId:1027,
          branchCompany:args.name,
          isAll:false
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
    }else{
      this.setState(
        Object.assign(this.state.popOptions, this.state.popOptions, {
          isAll:true,
          cateContent: '全部'+this.state.popOptions.cate 
        }),
        console.log(this.state.popOptions)
      );
      this.setState(
        {
          cateContentIndex: -1
        },
        () => this.instance.update(this.getContent())
      );
    }
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
//选择时间控件选择后触发事件：
onOk(value) {
  this.setState(
    Object.assign(this.state.popOptions, this.state.popOptions, {
      startDate: value.startDate,
      endDate: value.endDate,
      timeZone: this.timestampToTime(value.startDate) + '-' + this.timestampToTime(value.endDate)
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
      //end:::



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
    showTopPanel: true,
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
          <Button className="page-btn-setFilter"
              onClick={this.clickSetContent.bind(this, {
                isAll:true,
                index:-1
              })}
              type={
                this.state.cateContentIndex == -1
                  ? "primary"
                  : "secondary"
              }
              >全部</Button>
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
  handleClick(workNo) {
    this.dispatch('fetch', { workNo });
  }
  onChartReadyCallback() {
    console.log("chart is ready.");
  }
  render() {
    const t = this;
    const onChange = (activeIndex, path) => {
      console.log(t.context);
      // 这里是触发每个item之后的回调，会返回当前点击的item的index 值
      t.context.router.push(path);
      // if(activeIndex == 4){
      //   //如果是更多的Tab显示遮罩层
      //   t.showMask();
      // }
    };
    const { defaultItems, option } = t.state;
    return (
      <div className="page-chart">
        <div className="page-graph">
          <div style={{ padding: "10px" }}>
          <Button
            className="page-button"
            
          >
            {this.state.popOptions.maccord}
          </Button>
          <Button
            className="page-button"
            onClick={t.clickFetchOrganization.bind(t)}
          >
            {this.state.popOptions.cateContent}
          </Button>
          <Button className="page-button timeZone">
            {this.state.popOptions.timeZone}
          </Button>
          <div className="demo" />
        </div>
        <ReactEchartsCore
          className="page-echart"
          echarts={echarts}
          option={option}
          style={{ height: "300px" }}
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
PageInoutput.contextTypes = {
  router: Object
}