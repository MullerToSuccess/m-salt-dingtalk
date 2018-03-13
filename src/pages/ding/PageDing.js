import { Component } from 'refast';
import { DDReady } from '../../app/ding';
import axios from 'axios';
import logic from './logic';
import {GLOBALS} from '../../app/variables';
import './PageDing.less';
import Button from 'saltui/lib/Button';
import {PasswordInput, TabBar, Table, Calendar, Datetime, Popup, Slot} from 'saltui';

export default class PageDing extends Component {
    componentDidMount() {
      this.dispatch('fetchTabItems');//获取权限的菜单的item;
      }

    changeRoute(item){
        // t.context.router.push(path);
        console.log(11,item);
        if(item.title == '投入产出' || item.title == '排行榜'
           || item.title == '财务' || item.title == '更多'){
            this.context.router.push(item.path);
        }else{
          alert('暂无模块');
        }
        
    }
  constructor(props,context) {
    super(props, logic);
    //数据格式化：
    
   
    this.state = {
      activeIndex:4,
      visible:false,
      mclassify:'订单',
      mcorp:'爱途享',
      mdate:'1499702400000',
      keyword:1,
      allItems:[],
      defaultItems:[],
      moreItems:[]
    }; 
    this.changeRoute = this.changeRoute.bind(this);
  }
  render() {
      const t =this;
      const {moreItems,allItems,defaultItems} = t.state;
      // const { defaultItems } = t.state;
      DDReady.then((dd) => {
        dd.biz.navigation.setTitle({
          title: '更多',
          onSuccess: function(data) {
            /*alert('dd is ok')*/
          },
          onFail: function(err) {
              log.e(JSON.stringify(err));
          }
          });
          //设置menu
      });
    const onChange = (activeIndex, path) => {
        console.log(t.context);
        // 这里是触发每个item之后的回调，会返回当前点击的item的index 值
        t.context.router.push(path);
      }; 
  //     menuItems += item.isDefault ? (<div className='moreIcon' onClick={t.changeRoute.bind(this,item)}>
  //     <img
  //     src={item.activeIcon}>{item.title}</img>
  //   </div>) : (<div className='moreIcon' onClick={t.changeRoute.bind(this,item)}>
  //   <img
  //   src={item.activeIcon}>{item.title}</img>
  // </div>)
    // let menuItems, defaultItems, notDefaultItems;
    // console.log(132);
    // allItems.map(((item, index) => (
    //   <div className='moreIcon' onClick={t.changeRoute.bind(this,item)}>
    //       <img
    //        src={item.activeIcon}>{item.title}</img>
    //      </div>
    //     )
    //   )
    // )

    
    return (
      <div className="page-demo">
      <div className="set-title">
        <span>常用设置</span>
      </div>
        <div className="set-content">
        {
          defaultItems.map(((item, index) => (
            <div className='moreIcon' onClick={t.changeRoute.bind(this,item)}>
                <img className="set-image"
                 src={item.moreIcon}></img>
                 <div className="set-name">{item.title}</div>
            </div>
              )
            )
          )
        } 
        </div>
        <div className="set-gap"></div>
        <div className="set-title">
        <span>其他设置</span>
        </div>
        <div className="set-content">
        {
          moreItems.map(((item, index) => (
            <div className='moreIcon' onClick={t.changeRoute.bind(this,item)}>
            <img className="set-image"
             src={item.moreIcon}></img>
             <div className="set-name">{item.title}</div>
        </div>
              )
            )
          )
        }
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
PageDing.contextTypes = {
    router: Object
  }