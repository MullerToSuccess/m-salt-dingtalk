import { Component } from 'refast';
import Group from 'saltui/lib/Group';

import List from 'components/list';
import Info from 'components/info';
import logic from './logic';
import axios from 'axios';
import './PageDemo.less';
import { DDReady } from '../../app/ding';

export default class Page extends Component {

  constructor(props) {
    super(props, logic);//super绑定logic
  }

  componentDidMount() {
    DDReady.then((dd) => {
            dd.biz.navigation.setTitle({
              title: 'test',
              onSuccess: function(data) {
                /*alert('dd is ok')*/
              },
              onFail: function(err) {
                  log.e(JSON.stringify(err));
              }
              });
              // alert('md:'+JSON.stringify(dd));
              dd.biz.user.get({
                onSuccess: function (info) {
                    // alert(JSON.stringify(info));
                    console.log('userGet success: ' + JSON.stringify(info));
                },
                onFail: function (err) {
                  alert(JSON.stringify(err));
                  console.log('userGet fail: ' + JSON.stringify(err));
                }
            });
          });
    this.handleClick('555');
  }
  handleClick(workNo) {
    //跨域测试：
    // axios.get('http://192.168.0.94:8080/dingtalk/test?params=100')
    // .then(res => {
    //   alert(JSON.stringify(res));
    // });
    this.dispatch('fetchUser', { workNo });//派发事件fetch数据
    // this.dispatch('fetchIcons', {workNo});
  }

  render() {
    const t = this;
    const { list = [], error } = t.state;//取我们logic中异步获取后的setState后的state
    const Tag = list && list.length ? List : Info;

    return (
      <div className="page-demo">
        <Group>
          <Group.List lineIndent={15} itemIndent={15}>
            <Tag
              list={list}
              error={error}
              onClick={t.handleClick.bind(this)}
            />
          </Group.List>
        </Group>
      </div>
    );
  }
}
