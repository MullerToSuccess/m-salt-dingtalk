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
    const { dataset } = await fn.DB.Option.getEchartOptionByName(echartType);
    console.log(4545454545);
    let seriesLen = dataset.source[0].length - 1;
    let thisSeries = [];
    for(let i=0; i<seriesLen; i++){
      console.log('iiiiiiii');
      thisSeries.push({
        type: "line",
        markPoint : {
          data : [
            {type : 'max', name: '最大'},    // 最大值
            {type : 'min', name: '最小'}
          ]
        },
      })
    }
    const option = {
      legend: {},
      tooltip: {},
      dataset,
      xAxis: {
        type: "category",
        axisLabel: {  
          interval:0,
          rotate:45
       } 
      },
      yAxis: {
         
      },
      grid:{
        x:60
      },
      series: thisSeries
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
  },
  async fetchDataAccord({ fn, setState }) {
    const accord = await fn.DB.Data.getAccordFinance();
    setState({
      accord
    });
  },
  async fetchDataDepartment({ fn, setState }) {
    const departmentList = await fn.DB.Data.getDepartment();
    setState({
        departmentList
    });
  },
  async fetchDataCompany({ fn, setState }) {
    const companyList = await fn.DB.Data.getCompany();
    console.log('company_list:'+ companyList);
    setState({
        companyList
    });
  },
  async fetchDataFilter({ fn, setState }, filters) {
    const { dataset } = await fn.DB.Data.getFilterEchart(filters);
    let seriesLen = dataset.source[0].length - 1;
    let thisSeries = [];
    for(let i=0; i<seriesLen; i++){
      console.log('iiiiiiii');
      thisSeries.push({
        type: "line",
        markPoint : {
          data : [
            {type : 'max', name: '最大'},    // 最大值
            {type : 'min', name: '最小'}
          ]
        },
      })
    }
    const option = {
      legend: {},
      tooltip: {},
      dataset,
      xAxis: {
        type: "category",
        axisLabel: {  
          interval:0,
          rotate:0
       } 
      },
      toolbox: {
        show: true,
        feature: {
            magicType: {type: ['line', 'bar']},
        }
      },
      yAxis: {
         
      },
      grid:{
        x:60
      },
      series: thisSeries
    };
    console.log(666666, option);
    setState({
      option
    });
  },
  async fetchDataTable({ fn, setState }, filters) {
    const _thisData = await fn.DB.Data.getTableFinance(filters);
    let thisData=[];
    let thisColumns= [];
    if(_thisData.length>0){
      _thisData.forEach(function(item){
        let nsArr = item.ns.split(',');
        let vsArr = item.vs.split(',');
        thisData.push({
          "lm": vsArr[0], 
          "branch_company_name": item.branch_company_name, 
          "sale_money": vsArr[2], 
          "ly": vsArr[1],
          "lm_money":vsArr[3],
          "ly_money":vsArr[4]
        });
        console.log(666666);
        thisColumns=[    
          { dataKey: "branch_company_name", title: '公司', align: "center"},
          { dataKey: "sale_money", title: nsArr[2], align: "center"},
          { dataKey: "lm", title: nsArr[0], align: "center"},
          { dataKey: "ly", title: nsArr[1], align: "center"},
          { dataKey: "lm_money", title: nsArr[3], align: "center"},
          { dataKey: "ly_money", title: nsArr[4], align: "center"}
        ]
      })
    }
    const data = {
      data:thisData
    }
    const columns = thisColumns;
    console.log("columns: ",columns);
    setState({
      data,
      columns
    });
  }
};
