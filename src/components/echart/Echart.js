import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
export default ({ echarts,option }) => (
    <div>
    <ReactEcharts className="page-echart"
        echarts={echarts}
        option={option}
        style={{height: '300px'}}
        lazyUpdate={true}
    />
    </div>
  );
  