export default {
  defaults(props) {
    return {
      loaded: false,
      list: [],
      error: false
    };
  },
  async fetch({ fn, setState }, workNo) {
    const { list } = await fn.DB.User.getSomeInfo(workNo);
    setState({ loaded: true, list }); //异步请求后得到list刷新state
  },
  async fetchTabItems({ fn, setState }, userId) {
    const items = await fn.DB.Option.getTabItems();
    items.map(function(item){
          if (item.code == "LINKS") {
          let menus = item['menus'];
          console.log(555555,menus);
          const defaultItems = [];
          const moreItems = [];
          menus.forEach(function(item) {
            let temp = {};
            temp.icon = item.iconCssName;
            temp.path = item.url;
            temp.title = item.name;
            temp.activeIcon = item.activeIcon;
            if (item.isDefault) defaultItems.push(temp);
            else moreItems.push(temp);
          });
          console.log(defaultItems);
          console.log(moreItems);
          //遍历tabItems将菜单分为default和more
          setState({
            defaultItems: defaultItems,
            moreItems: moreItems
          });
        }
    })
  },
  //获取echarts的dataset后返回option
  async fetchEchartOption({ fn, setState }, echartType) {
    const { dataset } = await fn.DB.Option.getEchartOption(echartType);
    console.log(4545454545);
    const option = {
      legend: {},
      tooltip: {},
      dataset,
      xAxis: {
        type: "category",
        axisLabel: {
          interval: 0
        }
      },
      yAxis: {},
      series: [
        {
          type: "bar"
        },
        {
          type: "bar"
        },
        {
          type: "bar"
        }
      ]
    };
    console.log(454545, option);
    setState({
      option
    });

    // try {

    //     fn.message.success('Echart的配置获取成功');
    //   } catch(e) {
    //     fn.message.error(`Echart的配置的获取不成功:${e.errorMsg}`);
    //   }
  }
};
