import { Component } from 'refast';
import { DDReady } from '../../app/ding';
import axios from 'axios';
import logic from './logic';
import './PageDing.less';
import Button from 'saltui/lib/Button';
import {PasswordInput, TabBar, Table, Calendar, Datetime, Popup, Slot} from 'saltui';

export default class PageDing extends Component {
    componentDidMount() {
      this.dispatch('fetchEchartOption');//获取echart
      this.dispatch('fetchTabItems');//获取权限的菜单的item;
      
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
      defaultItems:[],
      moreItems:[]
    }; 
    this.datetimeProps = {
      locale: 'zh-cn',
    }
    
    
      window.dd && window.dd.ui.webViewBounce.disable();
  }
  


 
  handleClickDemo(){
    
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
      const {moreItems} = t.state;
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
    return (
      <div className="page-demo">
        <div>
        {
          moreItems.map(((item, index) => (
              <div className='moreIcon'> 
                <img src={item.activeIcon}>{item.title}</img>
              </div>
              )
            )
          )
        } 
        </div>
        <div>
        <TabBar tabBarStyle={{}}
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