// import React, { Component } from 'react';  
// import G2 from 'g2';  

// class ChartMsg extends Component {  
//     constructor(props) {  
//         super(props);  
  
//         this.state = {  
//             params: [],  
//             data: {},  
//             width: 600,   // 固定宽度    当自适应宽度开启，此功能失效  
//             forceFit: true, //forceFit自动试用宽度，默认false    
//             height: 400,  
//             plotCfg: {  
//                 margin: [30, 40, 90, 80],  
//                 background: {  
//                     stroke: '#ccc', // 边颜色  
//                     lineWidth: 1, // 边框粗细  
//                 } // 绘图区域背景设置  
//             }  
//         };  
//     }  
//     fetch(params = {}) {  
//         auth.fetch('/message/getChart30DayMsg', params, (res) => {  
//             this.setState({ loading: false });  
  
//             if (res.result == "0") {  
//                // console.log(res.data);  
//                 var Frame = G2.Frame;  
//                 var frame = new Frame(res.data.list);  
//                 frame = Frame.combinColumns(frame, ["成功", "失败"], '短信数量', '时间', 'days');  
//                 this.setState({  
//                     data: frame  
//                 });  
  
//             } else {  
//                 message.error(res.msg, 3);  
//             }  
//         });  
//     }  
  
// componentDidMount() { //初始化  
//         this.fetch();  
// }  
// render() {  
//         return (  
//             <div>  
//                 <Line  
//                     data={this.state.data} //设置数据  
//                     width={this.state.width}  //设置forceFit=true 时 失效  
//                     forceFit={this.state.forceFit}  //设置为自适应宽度  
//                     height={this.state.height}  //设置高度  
//                     plotCfg={this.state.plotCfg}  //设置配置  
//                 />  
//             </div>  
//         );  
//     }  
// }  
// export default ChartMsg; 
import { Component } from 'refast';
import Group from 'saltui/lib/Group';

import List from 'components/list';
import Info from 'components/info';
import './ChartMsg.less';

export default class ChartMsg extends Component {

    componentWillMount(){
        alert('chartMsg mount');
      }
      componentDidMount(){
        alert('chartMsg did mount');
      }
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.handleClick('1234');
  }

  handleClick(workNo) {
    this.dispatch('fetch', { workNo });
  }

  render() {
    const t = this;
    const { list = [], error } = t.state;
    const Tag = list && list.length ? List : Info;

    return (
      <div className="page-chart">
        <Group>
          <Group.List lineIndent={15} itemIndent={15}>
            <Tag
              list={list}
              error={error}
              onClick={t.handleClick.bind(t)}
            />
          </Group.List>
        </Group>
      </div>
    );
  }
}
