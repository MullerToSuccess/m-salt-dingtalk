import { Component } from 'react';
import { DDReady } from '../../app/ding';
import axios from 'axios';
import logic from './logic';
import './PageDing.less';
import Button from 'saltui/lib/Button';
import {PasswordInput, TabBar, Table, Calendar, Datetime, Popup, Slot} from 'saltui';

export default class PageDing extends Component {
    componentDidMount() {
        axios.get('http://192.168.0.94:8080/dingtalk/dingding.json')
              .then(res => {
                alert(JSON.stringify(res));
                // const posts = res.data.data.children.map(obj => obj.data);
        
                // this.setState({ posts });
        
              });

        //axios并发请求：
        // function getUserAccount() {
        //   return axios.get('http://192.168.0.94:8080/dingtalk/dingding.json');
        // }
        
        // function getUserPermissions() {
        //   return axios.get('http://192.168.0.94:8080/dingtalk/dingding.json');
        // }
        
        // axios.all([getUserAccount(), getUserPermissions()])
        //   .then(axios.spread(function (acct, perms) {
        //     // 两个请求现在都执行完成
        //     alert('tttttttttt');
        //   }));
      }
  constructor(props) {
    super(props, logic);
    //数据格式化：
    const {data, value} = Slot.formatDataValue([
      2011,
      2012,
      2013,
      2014,
      2015,
      2016,
      2017
    ]);
    const {quart, valueQuart} = Slot.formatDataValue([
      1,2,3,4
    ]);
    const {month, valueMonth} = Slot.formatDataValue([
      1,2,3,4,5,6,7,8,9,10,11,12
      // '1月',
      // '2月',
      // '3月',
      // '4月',
      // '5月',
      // '6月',
      // '7月',
      // '8月',
      // '9月',
      // '10月',
      // '11月',
      // '12月'
    ]);

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
      activeIndex:4,
      visible:false,
      mclassify:'订单',
      mcorp:'爱途享',
      mdate:'1499702400000',
      keyword:1,
      value,
      data,
      quart,
      valueQuart,
      month,
      valueMonth,
      confirmedValue:value,
      confirmedValueQuart:valueQuart,
      confirmedValueMonth:valueMonth,
      value1: 1499702400000,
      value2: {
        value: '2017-7-20 12:42:44',
        timeType: 'PM',
      }
    }; 
    this.datetimeProps = {
      locale: 'zh-cn',
    };
    //slot函数：
    this.showSlotYear = this.showSlotYear.bind(this);
    // this.showSlotQuart = this.showSlotQuart.bind(this);
    this.showSlotMonth = this.showSlotMonth.bind(this);

    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    // this.handleConfirmQuart = this.handleConfirmQuart.bind(this);
    // this.handleChangeQuart = this.handleChangeQuart.bind(this);
    // this.handleCancelQuart = this.handleCancelQuart.bind(this);

    this.handleConfirmMonth = this.handleConfirm.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleCancel = this.handleCancel.bind(this);
    
    
      window.dd && window.dd.ui.webViewBounce.disable();
  }
  //自己的函数：
  //选年：
  showSlotYear(){
    console.log(this.refs)
    this.refs.slot.show();
  }
  handleConfirm(value){
    this.setState({
      value,
      confirmedValue:value
    })
  }
  handleChange(value){
    this.setState({
      value
    })
  }
  handleCancel(){
    this.setState({
      value:this.state.confirmedValue
    })
  }
  //选季度：
  // showSlotQuart(){
  //   console.log(this.refs)
  //   this.refs.slotQuart.show();
  // }
  // handleConfirmQuart(value){
  //   this.setState({
  //     valueQuart,
  //     confirmedValueQuart:valueQuart
  //   })
  // }
  // handleChangeQuart(valueQuart){
  //   this.setState({
  //     valueQuart
  //   })
  // }
  // handleCancelQuart(){
  //   this.setState({
  //     valueQuart:this.state.confirmedValueQuart
  //   })
  // }
  //选月：
  showSlotMonth(){
    console.log(this.refs)
    this.refs.slotMonth.show();
  }
  handleConfirmMonth(value){
    this.setState({
      value,
      confirmedValue:value
    })
  }
  // handleChange(value){
  //   this.setState({
  //     value
  //   })
  // }
  // handleCancel(){
  //   this.setState({
  //     value:this.state.confirmedValue
  //   })
  // }
  
 

  getContent() {
    const content = (
      <div className="demo-popup-container-2">
        <input
          value={this.state.keyword}
          onChange={(e) => {
            this.setState({ keyword: e.target.value }, () => {
              this.instance.update(this.getContent());
            });
          }}
        />
      </div>
    );
    return content;
  }

  onConfirm(value, id) {
    console.log('onConfirm', value);
    //选择时间后改变时间：
    alert(JSON.stringify(value));
    this.setState({
      [id]: value.value,
    });
  }

  onCancel(id) {
    console.log('cancel', this.state[id]);
  }

  showSlot(id) {
    this[id].show();
  }
  //自己函数：
  // dateClick(){
  //   alert('Amazing');
  //   this.setState({
  //       visible: true,
  //       singleMode: true,
  //       animationType: 'slideUp',
  //       showHalfDay: true,
  //     });
  // }
  leftPop(){
    // this.setState({
    //   visible:true
    // })
    //向左弹出：
    Popup.show(
      <div className="demo-popup-container-2">我是弹出层
      <Button className="page-button-pop"  onClick={this.handleClick}>订单</Button>
      <Button className="page-button-pop"  onClick={this.handleClick}>公司</Button> 
      <Button className="page-button-pop"  onClick={this.handleClick}>2017.11</Button> 
      <div className='page-pop-classify'>分类
      </div>
      <div className='page-pop-corp'>公司</div>
      <div className='page-pop-date'>时间</div>
      </div>
      , {
      animationType: 'slide-left',
    });
  }
  handleClickDemo(){
    alert(22222222222)
    alert(JSON.stringify(this.state));
    this.setState({
      mclassify:'修改',
      mdate:'修改',
      mcorp:'修改'
    })
  }
  handleClick(){
        //修改状态：
        alert(JSON.stringify(this.state));
        // this.setState({
        //   mclassify:'修改',
        //   mcorp:'修改',
        //   mdate:'修改',
        // })
        dd.runtime.permission.requestAuthCode({
        corpId : window._config.corpId,
        onSuccess : function(info) {
            $.ajax({
                url : 'userinfo?code=' + info.code + '&corpid='
                        + _config.corpId,
                type : 'GET',
                success : function(data, status, xhr) {
                    var info = JSON.parse(data);
                    alert(JSON.stringify(info));
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
      DDReady.then((dd) => {
        dd.biz.navigation.setTitle({
          title: '测试',
          onSuccess: function(data) {
            /*alert('dd is ok')*/
          },
          onFail: function(err) {
              log.e(JSON.stringify(err));
          }
          });
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
                  // t.dateClick();
                  t.leftPop();
              },
              onFail: function(err) {
              }
          });
      });
    const onChange = (activeIndex, path) => {
        console.log(t.context);
        // 这里是触发每个item之后的回调，会返回当前点击的item的index 值
        t.context.router.push(path);
        // if(activeIndex == 4){
        //   //如果是更多的Tab显示遮罩层
        //   t.showMask();
        // }
      };
      // const handleClickDemo = () =>{
      //   alert(JSON.stringify(t.state));
      // }
    return (
      <div className="page-demo">
        <h1>hello dingTalk!</h1>
        <div style={{padding:'10px'}}>
        <Button className="page-button"  onClick={t.handleClickDemo.bind(t)}>{this.state.mclassify}</Button>
        <Button className="page-button"  onClick={t.handleClickDemo.bind(t)}>{this.state.mcorp}</Button> 
        <Button className="page-button"  onClick={t.handleClickDemo.bind(t)}>{this.state.mdate}</Button> 
        <Button onClick={() => {
          t.showSlot('slot1');
        }}>选择日期</Button>
        <Datetime
        {...this.datetimeProps}
        slotRef={s => t.slot1 = s}
        title="自定义"
        value={t.state.value1}
        columns={Datetime.YMD}
        onConfirm={(value) => { this.onConfirm(value, 'value1'); }}
        onCancel={() => { this.onCancel('value1'); }}
      />
      <div>当前日期：
      <input placeholder={t.state.value1}></input>
      
      </div>
        </div>
        <div className="demo">
        <Button onClick={() => {
          Popup.show(
            <div className="demo-popup-container-2">分类，时间等</div>
            , {
            animationType: 'slide-left',
          });
        }}
        >向左划出</Button>
        <Popup
          content={
            <div>
              <input
                value={this.state.keyword}
                onChange={(e) => { this.setState({ keyword: e.target.value }); }}
              />
              <Button onClick={() => { this.setState({ visible: false }); }}>关闭 Popup</Button>
            </div>
          }
          animationType="slide-down"
          onMaskClick={() => { this.setState({ visible: false }); }}
          visible={this.state.visible}
        >
          {null}
        </Popup>
      </div>
      <div>
        <div>
          <Button size="large" onClick={this.showSlotYear.bind(t)}>选年</Button>
        </div>
        <div>确认值：{this.state.confirmedValue[0].text}</div>
        <div>临时值：{this.state.value[0].text}</div>
      </div>
      <Slot
        ref="slot"
        data={this.state.data}
        value={this.state.value}
        title="选择日期"
        onConfirm={this.handleConfirm}
        onChange={this.handleChange}
        onCancel={this.handleCancel}
      />
     
    <div>
    <div>
      <Button size="large" onClick={this.showSlotMonth.bind(t)}>选月</Button>
    </div>
    <div>确认值：{this.state.confirmedValue[0].text}</div>
    <div>临时值：{this.state.value[0].text}</div>
  </div>
  <Slot
    ref="slotMonth"
    data={this.state.month}
    value={this.state.valueMonth}
    title="选择日期"
    onConfirm={this.handleConfirm}
    onChange={this.handleChange}
    onCancel={this.handleCancel}
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
PageDing.contextTypes = {
    router: Object
  }