export default {
  defalut(props) {
    return {
      option,
      tabItems,
      accord,
      organization
    };
  },
  async fetchEchartOption({ fn, setState }, echartType) {
    const { dataset } = await fn.DB.Option.getEchartOption(echartType);
    console.log(666,dataset.source[0]);
    let seriesLen = dataset.source[0].length - 1;
    let thisSeries = [];
    for(let i=0; i<seriesLen; i++){
      console.log('iiiiiiii');
      thisSeries.push({
        type: "bar",
        markPoint : {
          data : [
            {type : 'max', name: '最大'},    // 最大值
            {type : 'min', name: '最小'}
          ]
        },
      })
    }
    console.log(thisSeries);
    const option = {
      legend: {},
      tooltip: {},
      dataset,
      yAxis: {
        type: "category",
      },
      xAxis: {
        axisLabel: {  
          interval:1,
          rotate:45
       }  
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
  async fetchTabItems({ fn, setState }, userId) {
    // const { menus } = await fn.DB.Option.getTabItems();
    const items = await fn.DB.Option.getTabItems();
    items.map(function(item) {
      if (item.code == "LINKS") {
        let menus = item["menus"];
        console.log(555555, menus);
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
    });
  },
  //定义格式：所有异步获取的均为res.message:
  async fetchDataFilter({ fn, setState }, filters) {
    const { dataset } = await fn.DB.Data.getFilterEchart(filters);
    let seriesLen = dataset.source[0].length - 1;
    let thisSeries = [];
    for(let i=0; i<seriesLen; i++){
      console.log('iiiiiiii');
      thisSeries.push({
        type: "bar",
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
      yAxis: {
        type: "category",
        axisLabel: {
          interval: 0
        }
      },
      toolbox: {
        show: true,
        feature: {
            magicType: {type: ['line', 'bar']},
        }
      },
      xAxis: {},
      series: thisSeries
    };
    console.log(666666, option);
    setState({
      option
    });
  },
  async fetchDataTable({ fn, setState }, filters) {
    const _thisData = await fn.DB.Data.getTableSalesIn(filters);
    let thisData = [];
    if(_thisData.length>0){
      _thisData.forEach(function(item){
        thisData.push({
          "lm": item.lm || 0, 
          "branch_company_name": item.branch_company_name, 
          "sale_money": item.sale_money, 
          "ly": item.ly || 0
        });
      })
    }
    const data = {
      data:thisData
    }
    setState({
      data
    });
  },
  async fetchDataAccord({ fn, setState }) {
    const accord = await fn.DB.Data.getAccord();
    setState({
      accord
    });
  },
  async fetchDataOrganization({ fn, setState }) {
    const organization = await fn.DB.Data.getOrganization();
    setState({
      organization
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
  }
};
