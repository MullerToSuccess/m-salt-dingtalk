import { Component } from 'react';
import {PasswordInput, TabBar, Table} from 'saltui';
// import List from 'components/list';
// import Info from 'components/info';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import './PageStrengthline.less';
import { DDReady } from '../../app/ding';
export default class PageStrengthline extends Component {

    // componentWillMount(){
    //     alert('PageFinance mount');
    //   }
    //   componentDidMount(){
    //     alert('PageFinance did mount');
    //   }
    componentDidMount() {
      DDReady.then((dd) => {
  
        dd.biz.navigation.setTitle({
          title: '实力线',
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
            icon: '/dingtalk/images/tab bar icon_paihangbang_normal.png',
            activeIcon:'/dingtalk/images/tab bar icon_paihangbang_active.png',
            path: '/home',
          },
          {
            title: '财务',
            icon: '/dingtalk/images/tab bar icon_caiwu_normal.png',
            activeIcon:'/dingtalk/images/tab bar icon_caiwu_active.png',
            badge: 'new',
            badgeStyle: { right: -5 },
            path: '/finance',
          },
          {
            title: '投入产出',
            icon: '/dingtalk/images/tab bar icon_touruchanchu_normal.png',
            activeIcon:'/dingtalk/images/tab bar icon_touruchanchu_active.png',
            path: '/inoutput',
          },
          { title: '实力线', 
          icon: '/dingtalk/images/tab bar icon_shilixian_normal.png',
          activeIcon:'/dingtalk/images/tab bar icon_shilixian_active.png',
           path: '/strengthLine' },
          { title: '更多', 
          icon: '/dingtalk/images/tab bar icon_more_normal.png',
          activeIcon:'/dingtalk/images/tab bar icon_more_active.png',
           badge: 2, path: '/more' },
        ];
        this.state = {
          activeIndex:3}; 
                  
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
          text: '实力线'
      },
      tooltip : {
          trigger: 'axis'
      },
      legend: {
          data:['2011年', '2012年']
      },
      calculable : true,
      xAxis : [
          {
              type : 'value',
              boundaryGap : [0, 0.01]
          }
      ],
      yAxis : [
          {
              type : 'category',
              data : ['巴西','印尼','美国','印度','中国','世界人口(万)']
          }
      ],
      series : [
          {
              name:'2011年',
              type:'bar',
              data:[18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
              name:'2012年',
              type:'bar',
              data:[19325, 23438, 31000, 121594, 134141, 681807]
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
PageStrengthline.contextTypes = {
  router: Object
}