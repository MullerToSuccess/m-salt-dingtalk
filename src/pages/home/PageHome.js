import { Component } from 'react';

//引入echarts和react-fot-react:
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';

import Toast from 'saltui/lib/Toast';
import Button from 'saltui/lib/Button';
// import TabBar from 'saltui/lib/TabBar';
import { Group, PasswordInput, TabBar, Table} from 'saltui';
import { Mask } from 'saltui';
import Time from 'salt-icon/lib/Time';
import Plus from 'salt-icon/lib/Plus';

import './PageHome.less';
// import  tabImg1 from '/src/images/tab bar icon_touruchanchu_active.png';
// import  tabImg2 from '/src/images/tab bar icon_touruchanchu_active.png';
// import  tabImg3 from '/src/images/tab bar icon_touruchanchu_active.png';
// import  tabImg4 from '/src/images/tab bar icon_touruchanchu_active';
// import  tabImg5 from '/src/images/tab bar icon_touruchanchu_active';
export default class PageHome extends Component {

  constructor(props) {
    super(props);
    this.TabBarItems = [
      {
        title: '排行榜',
        // icon: <Time />,
        icon: '/src/images/tab bar icon_paihangbang_normal.png',
        activeIcon:'/src/images/tab bar icon_paihangbang_active.png',
        path: '/star',
      },
      {
        title: '财务',
        icon: '/src/images/tab bar icon_caiwu_normal.png',
        activeIcon:'/src/images/tab bar icon_caiwu_active.png',
        badge: 'new',
        badgeStyle: { right: -5 },
        path: '/a/star',
      },
      {
        title: '投入产出',
        icon: '/src/images/tab bar icon_touruchanchu_normal.png',
        activeIcon:'/src/images/tab bar icon_touruchanchu_active.png',
        path: '/a/star',
      },
      { title: '实力线', 
      icon: '/src/images/tab bar icon_shilixian_normal.png',
      activeIcon:'/src/images/tab bar icon_shilixian_active.png',
       path: '/b/star' },
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
  render() {
    const t = this;
    const onChange = (activeIndex) => {
      // 这里是触发每个item之后的回调，会返回当前点击的item的index 值
      console.log(activeIndex);
      if(activeIndex == 4){
        //如果是更多的Tab显示遮罩层
        t.showMask();
      }
    };
    return(
            <div className="page-home">
            
            <ReactEcharts
            // option={{}}
            // style={{height: '300px'}}
            // theme={"theme_name"}
            // onChartReady={this.onChartReadyCallback}
            // onEvents={EventsDict} />
            //    <Mask visible={t.state.maskvisible}
            //     onWillHide={t.handleWillHide.bind(t)}
            //     onDidHide={t.handleDidHide.bind(t)}
            //     opacity={0.4}
            //   />
              <div className="page-graph">
                表图显示
                <div style={{padding:'10px'}}>
                <Button style={{borderRadius:0,width:90,display:'inline-block'}} onClick={this.handleClick}>订单</Button>
                <Button style={{borderRadius:0,width:90,display:'inline-block'}} onClick={this.handleClick}>公司</Button> 
                <Button style={{borderRadius:0,width:90,display:'inline-block'}} onClick={this.handleClick}>2017.11</Button> 
                </div>
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

