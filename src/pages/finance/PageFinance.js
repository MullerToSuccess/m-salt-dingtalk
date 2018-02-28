import { Component } from "refast";
import { PasswordInput, TabBar, Table } from "saltui";
import echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import { DDReady } from "../../app/ding";
// import List from 'components/list';
// import Info from 'components/info';
import logic from "./logic";
import "./PageFinance.less";

//自己写的子组件：
class Child extends Component {
  constructor(props) {
    super(props, logic);
  }
  render() {
    let t = this;
    return (
      <div>
        <input type="text" ref="myTextInput" />
        <input
          type="button"
          value="focus the text input"
          onClick={this.myHandleClick}
        />
        <br />
        请输入：<input onChange={this.props.handleEmail} />
      </div>
    );
  }
}

export default class PageFinance extends Component {
  // componentWillMount(){
  //     alert('PageFinance mount');
  //   }
  //   componentDidMount(){
  //     alert('PageFinance did mount');
  //   }

  //组件加载后：
  componentDidMount() {
    const tt = this;

    this.dispatch('fetchTabItems');//获取权限的菜单的item;
    this.dispatch("fetchEchartOption", 3); //获取echart
    DDReady.then(dd => {
      dd.biz.navigation.setTitle({
        title: "财务",
        onSuccess: function(data) {
          /*alert('dd is ok')*/
        },
        onFail: function(err) {
          log.e(JSON.stringify(err));
        }
      });
    });
  }

  constructor(props, context) {
    super(props, logic);
    this.state = {
      activeIndex: 1,
      allItems: [],
      defaultItems: [],
      moreItems: [],
      option:{}
    };
  }
  getInitialState() {
    return {
      email: ""
    };
  }
  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
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
    const { defaultItems, option } = t.state;

    return (
      <div className="page-chart">
        <ReactEcharts
          className="page-echart"
          echarts={echarts}
          option={option}
          style={{ height: "300px" }}
          lazyUpdate={true}
          onChartReady={this.onChartReadyCallback}
        />
        <div>
          用户邮箱：{this.state.email}
          <Child name="email" handleEmail={this.handleEmail.bind(this)} />
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
PageFinance.contextTypes = {
  router: Object
};
