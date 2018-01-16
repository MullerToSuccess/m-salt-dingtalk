import { Component } from 'refast';
// import Refast  from 'refast';
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';
//引入echarts和react-fot-react:
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import { DDReady } from '../../app/ding';
import axios from 'axios';
import mEchart from 'components/echart';
import Info from 'components/info';
import { render, Link } from 'react-dom';
import Toast from 'saltui/lib/Toast';
import Button from 'saltui/lib/Button';
// import TabBar from 'saltui/lib/TabBar';
import { Group, PasswordInput, TabBar, Table, Popup, CalendarField, Scroller} from 'saltui';
import { Mask } from 'saltui';
import Time from 'salt-icon/lib/Time';
import Plus from 'salt-icon/lib/Plus';
// import PageDemo from 'pages/demo';
import './PageHome.less';
// const customHistory = hashHistory;
import logic from './logic';
import {GLOBALS} from '../../app/variables';
export default class PageHome extends Component {

  //组件加载后：
  //1：初始化我们的组件：echart， table， tabItems 等
  //2：调用钉钉api，获取所有的要用到钉钉的接口
  componentDidMount() {
    //跨域测试：
    // axios.get('http://192.168.0.94:8080/dingtalk/test')
    // .then(res => {
    //   alert(JSON.stringify(res));
    // });
    this.dispatch('fetchEchartOption');//获取echart
    this.dispatch('fetchTabItems');//获取权限的菜单的item;
    
    DDReady.then((dd) => {
        //钉钉验证后：根据登录用户信息初始化组件
        dd.biz.user.get({
            corpId:dd.config.corpId, // 可选参数，如果不传则使用用户当前企业的corpId。
            onSuccess: function (info) {
                alert(info);
                this.dispatch('fetchEchartOption');//获取echart
                this.dispatch('fetchTabItems');//获取权限的菜单的item;
            },
            onFail: function (err) {
                alert('失败');
                // logger.e('userGet fail: ' + JSON.stringify(err));
            }
        });
        
      dd.biz.navigation.setTitle({
        title: '排行榜',
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
    super(props, logic);
    // this.context.router;
    // this.TabBarItems = ;
    this.state = {
      maskvisible: false,
      activeIndex:0,
      visible:false,
      keyword:1,
      // value: '2016-01-02',
      value: {
        startDate: '2016-01-02',
        startDateType: 'AM',
        endDate: '2016-01-03',
        endDateType: 'PM',
      },
      accord:[],
      popClassCotent:'公司',//默认：公司List
      order:'订单',
      organization:'公司',
      date:'2018.1.3',//时间date:存长整型
      //公司，部门，业务员等的接口通过后台接口获得：
      companyList:[{
        "name":'公司1',
        "corpId":"123456"
      },{
        "name":'公司2',
        "corpId":"123456"
      },{
        "name":'公司3',
        "corpId":"123456"
      },{
        "name":'公司4',
        "corpId":"123456"
      }],//fetch的公司列表
      departmentList:[{
        "name":'部门1',
        "corpId":"123456"
      },{
        "name":'部门2',
        "corpId":"123456"
      },{
        "name":'部门3',
        "corpId":"123456"
      },{
        "name":'部门4',
        "corpId":"123456"
      }],//fetch的部门的列表
      clientList:[],//fetch的客户的列表
      salesList:[],//fetch的业务员的列表
      productList:[],//fetch的产品的列表
      productCate:[],//fetch的产品分类的列表
      option:{},//存我们的echart的所有配置选项
      tabItems:[],//存放我们的权限菜单的tabItems
      
      data: {
                data: [
                  {
                    email: 'xw@abc.com',
                    nameId: '是不会变得说不出街道办事处比较说的ng',
                    name: '小王',
                    cityId: 'bj',
                    city: '北京东路的日子无与伦比的美丽',
                    sex: '女',
                  },
                  {
                    email: 'xl@abc.com',
                    nameId: 'xiaoli',
                    name: '小李',
                    cityId: 'hz',
                    city: '杭州',
                    sex: '男',
                  },
                  {
                    email: 'xl@abc.com',
                    nameId: 'xiaoli',
                    name: '小李',
                    cityId: 'hz',
                    city: '杭州',
                    sex: '男',
                  },
                  {
                    email: 'xl@abc.com',
                    nameId: 'xiaoli',
                    name: '小李',
                    cityId: 'hz',
                    city: '杭州',
                    sex: '男',
                  },
                  {
                    email: 'xl@abc.com',
                    nameId: 'xiaoli',
                    name: '小李',
                    cityId: 'hz',
                    city: '杭州',
                    sex: '男',
                  },
                  {
                    email: 'xl@abc.com',
                    nameId: 'xiaoli',
                    name: '小李',
                    cityId: 'hz',
                    city: '杭州',
                    sex: '男',
                  },
                  {
                    email: 'xl@abc.com',
                    nameId: 'xiaoli',
                    name: '小李',
                    cityId: 'hz',
                    city: '杭州',
                    sex: '男',
                  },
                  {
                    email: 'xl@abc.com',
                    nameId: 'xiaoli',
                    name: '小李',
                    cityId: 'hz',
                    city: '杭州',
                    sex: '男',
                  }
                ],
      },
      columns: [
                    { dataKey: 'city', title: '单位', align: 'center' },
                    { dataKey: 'name', title: '销售', align: 'center' },
                    { dataKey: 'email', title: '同比', align: 'center' },
                    { dataKey: 'email', title: '环比', align: 'center' }
              ]}; 
              //绑定事件到组件：
              this.showMask = this.showMask.bind(this);
              this.handleClick = this.handleClick.bind(this);
              this.clickFetchAccord = this.clickFetchAccord.bind(this);
              this.clickFetchOrganization = this.clickFetchOrganization.bind(this);
              this.clickSetAccord = this.clickSetAccord.bind(this);
              this.clickSetOrganization = this.clickSetOrganization.bind(this);
              // this.onOk = this.onOk.bind(this);
  }

  showMask() {
    this.setState({
      maskvisible: true,
    });
  }

  handleWillHide() {
    console.log('mask will hide');
        // 如果返回false 则Mask是不能关闭的
        // return false;
  }

  handleDidHide() {
    console.log('mask did hide');
  }
  

  handleClick(options) {
    Toast.show(options);
  }
  subPop(options){
    console.log(options);
  }
    clickFetchAccord(){
        //请求getAccord接口：
        this.dispatch('fetchDataAccord');
        const {accord} = this.state;
        console.log(22222,accord);
        //根据返回后的数据：
        Popup.show(
            <div className="demo-popup-container-2">
            {
                GLOBALS.globalAccord.map(item => (
                  <div className="t-LH44 t-FBH t-FBAC">
                    <div className="t-FB1 t-PL10" onclick={this.clickSetAccord.bind(this,item.name)}>
                      {item.name}{item.typeId ? `(${item.typeId})` : ''}
                    </div>
                  </div>
                ))
              }
            </div>
            , {
            animationType: 'slide-down',
          });
    }
    //popup筛选条件中设置的点击事件
    clickSetAccord(args){
      // console.log(this);
      // alert('set Accord');
      // const ref1 = ReactDOM.findDOMNode(this.refs.ref1);//取到真实的dom
      // console.log(ref1);
      const contentList = this.state[args.name];
      
      this.setState({
        'order':'name',
        'popClassCotent':args.cname
      },() => this.instance.update(this.getContent(this.state[args.name])));//异步setState后回调问题
      //请求该name下的接口：

    }
    clickSetOrganization(){
      this.setState({
        'organization':'修改'
      })
      alert('set Organization');
    }
    
    //获取popup的内容以及更新
    getContent(popContentList) { 
      //时间选项的属性：
    const props = {
      className: 'calendar-field-demo myCalender',
      label: '日期区间',
      placeholder: ['开始时间', '结束时间'],
      required: false,
      multiLine: true,
      layout: 'v',
      type: 'month',
      singleMode: false,
      // formatter: 'yyyy-MM-dd',
      showWeek: false,
      showDateType: false,
      showHalfDay: true,
      topPanelTitle: 'title',
      value: this.state.value,
      tip: '这里是提示信息',
      readOnly: false,
      animationType: 'slideLeft',
      onOk: this.onOk.bind(this),//选择确定后的触发事件
      showTopPanel: true,
      // formatter: 'yyyy.MM.dd',
    }
      //分类有公司，部门，客户，业务员，产品，产品分类等：
      //分别根据不同的接口访问后台接口获取list：
      const contentList = popContentList ? popContentList : this.state.companyList;//默认是用的companyList
      const content = (
        // <Scroller mouseWheel className='page'>
        <div className="demo-popup-container-2 myPop" >
        
        <div className='page-pop-classify'>分类<br/>
          <Button className="page-btn-setFilter"  onClick={this.clickSetAccord.bind(this,{'name':'companyList','cname':'公司'})}>公司</Button>
          <Button className="page-btn-setFilter"  onClick={this.clickSetAccord.bind(this,{'name':'departmentList','cname':'部门'})}>部门</Button> 
          <Button className="page-btn-setFilter"  onClick={this.clickSetAccord.bind(this,{'name':'clientList','cname':'客户'})}>客户</Button>
          <Button className="page-btn-setFilter"  onClick={this.clickSetAccord.bind(this,{'name':'salesList','cname':'业务员'})}>业务员</Button>
          <Button className="page-btn-setFilter"  onClick={this.clickSetAccord.bind(this,{'name':'productList','cname':'产品'})}>产品</Button>
          <Button className="page-btn-setFilter"  onClick={this.clickSetAccord.bind(this,{'name':'produceCate','cname':'产品分类'})}>产品分类</Button>   
        </div>
        <div className='page-pop-corp'>{this.state.popClassCotent}<br/>
        {
          contentList.map((item => (
              <Button className="page-btn-setFilter">{item.name}</Button>
              )
            )
          )
        }   
        </div>
        <div className='page-pop-date'>时间
        <ButtonGroup>
          <Button type="secondary" display="inline" onClick={this.handleClick}>年</Button>
          <Button type="secondary" display="inline" onClick={this.handleClick}>季</Button>
          <Button type="primary" display="inline" onClick={this.handleClick}>月</Button>
        </ButtonGroup>
        <br/>
        <Group>
        <Group.List>
          <CalendarField {...props} />
        </Group.List>
      </Group>
      </div>
        <div className='page-pop-category'>依据<br/>
        <Button className="page-btn-setFilter"  onClick={this.clickSetOrganization}>订单</Button>
        <Button className="page-btn-setFilter"  onClick={this.clickSetOrganization}>发货单</Button> 
        <Button className="page-btn-setFilter"  onClick={this.clickSetOrganization}>发票</Button>
        <Button className="page-btn-setFilter"  onClick={this.clickSetOrganization}>收款单</Button>   
      </div>
      <div className="section-content">
      <Button.Group>
        <Button type="secondary" display="banner" onClick={this.handleClick}>重置</Button>
        <Button type="primary" display="banner" onClick={this.handleClick}>确定</Button>
      </Button.Group>
    </div>
        </div>
        // </Scroller>
        
      );
      return content;
    }
    clickFetchOrganization(){
        //请求getOrganization的接口：
        console.log(this);
        this.instance = Popup.show(
          this.getContent()
          , {
              animationType: 'slide-left',
          onMaskClose:function(){
            alert('mask 关闭');
            //popup关闭后的回调：拿到所有的筛选的参数1：订单....；2：公司or部门..3：时间（long）
            //然后通过接口查询this.dispatch();
          }
          });
        // this.dispatch('fetchDataOrganization');
    }

  onChartReadyCallback(){
    // alert('坲克');
    console.log('chart is ready.');
  }
  //选择时间控件选择后触发事件：
  onOk(value){
    // alert(JSON.stringify(value));
    console.log(11,value);
    console.log(22,this.state.value);
    // this.setState({value});
    this.setState({
      value,
    },() => this.instance.update(this.getContent()));//更新popup的content
  }
  render() {
    const t = this;
    const onChange = (activeIndex, path) => {
      // 这里是触发每个item之后的回调，会返回当前点击的item的index 值
      t.context.router.push(path);
      if(activeIndex == 4){
        //如果是更多的Tab显示遮罩层
        t.showMask();
      }
    };
    // const { option = [], error } = t.state;
    // const Tag = option ? mEchart : Info;
    const { option, tabItems } = t.state;  //用到组件中的在state中取过来         
    return(
            <div className="page-home">
               <Mask visible={t.state.maskvisible}
                onWillHide={t.handleWillHide.bind(t)}
                onDidHide={t.handleDidHide.bind(t)}
                opacity={0.4}
              />
              
              <div className="page-graph">
                
                <div style={{padding:'10px'}}>
                  <Button className="page-button"  onClick={t.clickFetchAccord.bind(t)}>{this.state.order}</Button>
                  <Button className="page-button"  onClick={t.clickFetchOrganization.bind(t)}>{this.state.organization}</Button> 
                  <Button className="page-button"  onClick={t.handleClick}>{this.state.date}</Button> 
                  <div className="demo">
               
                </div>
                </div>
                
                <ReactEcharts className="page-echart"
                  echarts={echarts}
                  option={option}
                  style={{height: '300px'}}
                  lazyUpdate={true}
                  onChartReady={this.onChartReadyCallback}
                />
               
              </div>
              
              <div>
              <Table
                columns={t.state.columns}
                data={t.state.data}
                leftFixed={0}
              />
              </div>
              <div>
                <TabBar tabBarStyle={{}}
                        activeIndex={t.state.activeIndex}
                        onChange={onChange}
                        iconHeight={24}
                        cIconHeight={24}
                        items={tabItems}
                      />
              </div>
            </div>
          );
  }
}
PageHome.contextTypes = {
  router: Object
}

