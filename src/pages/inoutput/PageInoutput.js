import { Component } from 'react';
import {PasswordInput, TabBar, Table} from 'saltui';
// import List from 'components/list';
// import Info from 'components/info';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import './PageInoutput.less';
import { DDReady } from '../../app/ding';
export default class PageInoutput extends Component {

  componentDidMount() {
    DDReady.then((dd) => {

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
        super(props,context);
        this.context.router;
        this.TabBarItems = [
          {
            title: '排行榜',
            // icon: <Time />,
            icon: '/dingtalk/src/images/tab bar icon_paihangbang_normal.png',
            activeIcon:'/dingtalk/src/images/tab bar icon_paihangbang_active.png',
            path: '/home',
          },
          {
            title: '财务',
            icon: '/dingtalk/src/images/tab bar icon_caiwu_normal.png',
            activeIcon:'/dingtalk/src/images/tab bar icon_caiwu_active.png',
            badge: 'new',
            badgeStyle: { right: -5 },
            path: '/finance',
          },
          {
            title: '投入产出',
            icon: '/dingtalk/src/images/tab bar icon_touruchanchu_normal.png',
            activeIcon:'/dingtalk/src/images/tab bar icon_touruchanchu_active.png',
            path: '/inoutput',
          },
          { title: '实力线', 
          icon: '/dingtalk/src/images/tab bar icon_shilixian_normal.png',
          activeIcon:'/dingtalk/src/images/tab bar icon_shilixian_active.png',
           path: '/strengthLine' },
          { title: '更多', 
          icon: '/dingtalk/src/images/tab bar icon_more_normal.png',
          activeIcon:'/dingtalk/src/images/tab bar icon_more_active.png',
           badge: 2, path: '/more' },
        ];
        this.state = {
          activeIndex:2}; 
                  
      }

  

  handleClick(workNo) {
    this.dispatch('fetch', { workNo });
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
    let option = {
      title : {
          text: '投入产出',
          x:'center'
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      toolbox: {
          show : true,
          feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {
                  show: true, 
                  type: ['pie', 'funnel'],
                  option: {
                      funnel: {
                          x: '25%',
                          width: '50%',
                          funnelAlign: 'left',
                          max: 1548
                      }
                  }
              },
              restore : {show: true},
              saveAsImage : {show: true}
          }
      },
      calculable : true,
      series : [
          {
              name:'访问来源',
              type:'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:234, name:'联盟广告'},
                  {value:135, name:'视频广告'},
                  {value:1548, name:'搜索引擎'}
              ]
          }
      ]
  };
    return (
      <div className="page-chart">
      <ReactEcharts className="page-echart"
      echarts={echarts}
      option={option}
      style={{height: '300px'}}
      lazyUpdate={true}
      onChartReady={this.onChartReadyCallback}
      />
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
PageInoutput.contextTypes = {
  router: Object
}