import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Refast, { LogicRender } from 'refast';
import { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { render, Link } from 'react-dom';
import FastClick from 'fastclick';
import Toast from 'saltui/lib/Toast';
import Dialog from 'saltui/lib/Dialog';

import { isDev } from 'variables';
//直接import组件：在不按需加载的时候：
import PageDing from 'pages/ding';
import PageHome from 'pages/home';
import PageDemo from 'pages/demo';
import ChartMsg from 'pages/Chart';
import PageFinance from 'pages/finance';
import PageInoutput from 'pages/inoutput';
import PageStrengthline from 'pages/strengthline';
import NotFound from 'pages/NotFound';
import DB from 'db';
import './app.less';

const customHistory = hashHistory;

if (isDev && window.chrome && window.chrome.webstore) { // This is a Chrome only hack
  // see https://github.com/livereload/livereload-extensions/issues/26
  setInterval(() => {
    document.body.focus();
  }, 200);
}

// bind fastclick
FastClick.attach(document.body);

// 这里使用 use 来配置 Refast
// Refast.use注册中间件：
Refast.use('fn', {
  toast: Toast,
  dialog: Dialog,
  DB,
  history: customHistory,
});

const Loading = () => <div className="kuma-loading" />;
const Empty = () => <div>暂无数据</div>;

// 修改 LogicRender 增加默认配置
// 用来自定义Loading和Empty的样式
Object.assign(LogicRender.defaultProps, { Empty, Loading });

class App extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
//动态配置publicPath:
// __webpack_public_path__ = $path
// ? $path.getAttribute('content')+'/app/js/'
// : '/';
//webpack按需加载：
//调试先不管按需加载的问题：
// var PageHome =  function(location, callback) {
//   require.ensure([], function(require){
//     callback(null, require('../pages/home'));
//   },'home');
// };
// var PageFinance = function(location, callback) {
//   require.ensure([], function(require){
//     callback(null, require('../pages/finance'));
//   },'finance');
// };
// var PageInoutput = function(location, callback) {
//   require.ensure([], function(require){
//     callback(null, require('../pages/inoutput'));
//   },'inoutput');
// }; 
// var PageStrengthline = function(location, callback) {
//   require.ensure([], function(require){
//     callback(null, require('../pages/strengthline'));
//   },'strengthline');
// };
// var PageDing = function(location, callback) {
//   require.ensure([], function(require){
//     callback(null, require('../pages/ding'));
//   },'ding');
// };

render(
  <Router history={customHistory}>
    <Route name="app" path="/" component={App}>
      <IndexRoute component={PageHome} />
      <Route path="home" component={PageHome} />
      <Route path="finance" component={PageFinance} />
      <Route path="inoutput" component={PageInoutput} />
      <Route path="strengthLine" component={PageStrengthline} />
      <Route path="more" component={PageDing} />
      <Route path='404' component={NotFound} />
    </Route>
  </Router>,
  document.getElementById('App'),
);
