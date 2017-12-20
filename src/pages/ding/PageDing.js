import { Component } from 'react';
import { DDReady } from '../../app/ding';
import axios from 'axios';
import logic from './logic';
import './PageDing.less';
import Button from 'saltui/lib/Button';
import {PasswordInput, TabBar, Table, Calendar} from 'saltui';

export default class PageDing extends Component {
    componentDidMount() {
        axios.get('https://www.reddit.com/r/reactjs.json')
        
              .then(res => {
                alert(JSON.stringify(res));
                // const posts = res.data.data.children.map(obj => obj.data);
        
                // this.setState({ posts });
        
              });
        DDReady.then((dd) => {
        alert('dd is ready')
          dd.biz.navigation.setTitle({
            title: '测试',
            onSuccess: function(data) {
              /*alert('dd is ok')*/
            },
            onFail: function(err) {
                log.e(JSON.stringify(err));
            }
            });
            // //设置right:
            // dd.biz.navigation.setRight({
            //     show: true,//控制按钮显示， true 显示， false 隐藏， 默认true
            //     control: true,//是否控制点击事件，true 控制，false 不控制， 默认false
            //     text: '发送',//控制显示文本，空字符串表示显示默认文本
            //     onSuccess : function(result) {
            //         alert(123)
            //         dateClick();
            //         //如果control为true，则onSuccess将在发生按钮点击事件被回调
            //         /*
            //         {}
            //         */
            //     },
            //     onFail : function(err) {}
            // });
            //设置menu
            dd.biz.navigation.setMenu({
                backgroundColor : "#c8c8c8",
                textColor : "#c8c8c8",
                items : [
                    {
                        "id":"1",//字符串
                    "iconId":"search",//字符串，图标命名
                      "text":"过滤"
                    }
                ],
                onSuccess: function(data) {
                    alert(123);

                    t.dateClick.bind(t);
                },
                onFail: function(err) {
                }
            });
        });
      }
  constructor(props) {
    super(props, logic);
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
       badge: 2, path: '/more' },
    ];
    this.state = {
      activeIndex:4,
      value:1489702400000
    }; 
      window.dd && window.dd.ui.webViewBounce.disable();
      this.calendarProps = {
        maskClosable: true,
        renderDayBadge: Calendar.util.generateSpecialWorkdayOrHolidayRender({
          '2017-07-22': 'work',
          '2017-07-25': 'leave',
        }),
        renderCustomDayLabel(curren, value) {
          if (Calendar.util.isSameDay(curren, '2017.7.31')) {
            return (
              <span className="special-day">端午节</span>
            );
          }
          return null;
        },
      };
  }

  //自己函数：
  dateClick(){
      alert(33333333333);
    this.setState({
        visible: true,
        singleMode: true,
        animationType: 'slideUp',
        showHalfDay: true,
      });
  }
  handleClick(){
        dd.runtime.permission.requestAuthCode({
        corpId : window._config.corpId,
        onSuccess : function(info) {
            $.ajax({
                url : 'userinfo?code=' + info.code + '&corpid='
                        + _config.corpId,
                type : 'GET',
                success : function(data, status, xhr) {
                    var info = JSON.parse(data);
                    // alert(JSON.stringify(info));
                },
                error : function(xhr, errorType, error) {
                    logger.e("yinyien:" + _config.corpId);
                    alert(errorType + ', ' + error);
                }
            });
        
        },
        onFail : function(err) {
            alert('fail: ' + JSON.stringify(err));
        }
        });
  }

  render() {
      const t =this;
    const onChange = (activeIndex, path) => {
        console.log(t.context);
        // 这里是触发每个item之后的回调，会返回当前点击的item的index 值
        t.context.router.push(path);
        // if(activeIndex == 4){
        //   //如果是更多的Tab显示遮罩层
        //   t.showMask();
        // }
      };
    return (
      <div className="page-demo">
        <h1>hello dingTalk!</h1>
        <div style={{padding:'10px'}}>
        <Button className="page-button"  onClick={this.handleClick}>订单</Button>
        <Button className="page-button"  onClick={this.handleClick}>公司</Button> 
        <Button className="page-button"  onClick={this.handleClick}>2017.11</Button> 
        <Button onClick={this.dateClick.bind(t)}
          >选择日期</Button>
          
          <Calendar
            {...this.calendarProps}
            {...this.state}
            onOk={(value) => { this.onOk(value); }}
            onCancel={() => { this.onCancel(); }}
            onMaskClose={() => { this.onMaskClose(); }}
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
PageDing.contextTypes = {
    router: Object
  }