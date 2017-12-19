import { Component } from 'react';
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';
//引入echarts和react-fot-react:
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';

import { render, Link } from 'react-dom';
import Toast from 'saltui/lib/Toast';
import Button from 'saltui/lib/Button';
// import TabBar from 'saltui/lib/TabBar';
import { Group, PasswordInput, TabBar, Table} from 'saltui';
import { Mask } from 'saltui';
import Time from 'salt-icon/lib/Time';
import Plus from 'salt-icon/lib/Plus';
// import PageDemo from 'pages/demo';
import './PageHome.less';
// const customHistory = hashHistory;
// import  tabImg1 from '/src/images/tab bar icon_touruchanchu_active.png';
// import  tabImg2 from '/src/images/tab bar icon_touruchanchu_active.png';
// import  tabImg3 from '/src/images/tab bar icon_touruchanchu_active.png';
// import  tabImg4 from '/src/images/tab bar icon_touruchanchu_active';
// import  tabImg5 from '/src/images/tab bar icon_touruchanchu_active';
export default class PageHome extends Component {

  // componentWillMount(){
  //   alert('will mount')
  // }
  // componentDidMount(){
  //   alert('have mount')
  // }
  constructor(props,context) {
    super(props,context);
    this.context.router;
    this.TabBarItems = [
      {
        title: '排行榜',
        // icon: <Time />,
        icon: '/src/images/tab bar icon_paihangbang_normal.png',
        activeIcon:'/src/images/tab bar icon_paihangbang_active.png',
        path: '/home',
      },
      {
        title: '财务',
        icon: '/src/images/tab bar icon_caiwu_normal.png',
        activeIcon:'/src/images/tab bar icon_caiwu_active.png',
        badge: 'new',
        badgeStyle: { right: -5 },
        path: '/finance',
      },
      {
        title: '投入产出',
        icon: '/src/images/tab bar icon_touruchanchu_normal.png',
        activeIcon:'/src/images/tab bar icon_touruchanchu_active.png',
        path: '/inoutput',
      },
      { title: '实力线', 
      icon: '/src/images/tab bar icon_shilixian_normal.png',
      activeIcon:'/src/images/tab bar icon_shilixian_active.png',
       path: '/strengthLine' },
      { title: '更多', 
      icon: '/src/images/tab bar icon_more_normal.png',
      activeIcon:'/src/images/tab bar icon_more_active.png',
       badge: 2, path: '/c/star' },
    ];
    this.state = {
      maskvisible: false,
      activeIndex:0,
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
              this.showMask = this.showMask.bind(this);
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
    console.log('this index:',)
  }

  handleClick(options) {
    Toast.show(options);
  }
  onChartReadyCallback(){
    // alert('坲克');
    console.log('chart is ready.');
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
    let option = {
      title:{
        text: '排行榜',
        x:'center'
      },
      tooltip : {
          trigger: 'axis'
      },
      legend: {
          data:['最高气温','最低气温']
      },
      calculable : true,
      xAxis : [
          {
              type : 'category',
              boundaryGap : false,
              data : ['周一','周二','周三','周四','周五','周六','周日']
          }
      ],
      yAxis : [
          {
              type : 'value',
              axisLabel : {
                  formatter: '{value} °C'
              }
          }
      ],
      series : [
          {
              name:'最高气温',
              type:'line',
              data:[11, 11, 15, 13, 12, 13, 10],
              markPoint : {
                  data : [
                      {type : 'max', name: '最大值'},
                      {type : 'min', name: '最小值'}
                  ]
              },
              markLine : {
                  data : [
                      {type : 'average', name: '平均值'}
                  ]
              }
          },
          {
              name:'最低气温',
              type:'line',
              data:[1, -2, 2, 5, 3, 2, 0],
              markPoint : {
                  data : [
                      {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                  ]
              },
              markLine : {
                  data : [
                      {type : 'average', name : '平均值'}
                  ]
              }
          }
      ]
  };
                      
    return(
      
            <div className="page-home">
               <Mask visible={t.state.maskvisible}
                onWillHide={t.handleWillHide.bind(t)}
                onDidHide={t.handleDidHide.bind(t)}
                opacity={0.4}
              />
              
              <div className="page-graph">
                <div style={{padding:'10px'}}>
                <Button className="page-button"  onClick={this.handleClick}>订单</Button>
                <Button className="page-button"  onClick={this.handleClick}>公司</Button> 
                <Button className="page-button"  onClick={this.handleClick}>2017.11</Button> 
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
                        items={this.TabBarItems}
                      />
              </div>
            </div>
          );
  }
}
PageHome.contextTypes = {
  router: Object
}

