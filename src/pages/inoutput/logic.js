export default {
    defaluts(props) {
        return {
          tabItems
        };
      },
      async fetchTabItems({fn, setState}, userId){
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
    const accord = await fn.DB.Data.getAccord();
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
  async fetchDataTable({ fn, setState }, filters) {
    const _thisData = await fn.DB.Data.getTableInputOutput(filters);
    let thisData=[];
    let thisColumns= [];
    if(_thisData.length>0){
      _thisData.forEach(function(item){
        thisData.push({
          "lm": item.lm, 
          "c_inv_name": item.c_inv_name, 
          "c_inv_std": item.c_inv_std, 
          "ly": item.ly || 0,
          "ipo": item.ipo,
          "branch_company_name":item.branch_company_name,
          "qty":item.qty,
          "base_qty_n":item.base_qty_n,
          "base_qty_d":item.base_qty_d
        });
        thisColumns=[    
          { dataKey: "branch_company_name", title: '公司', align: "center"},
          { dataKey: "c_inv_name", title: '存货名称', align: "center"},
          { dataKey: "c_inv_std", title: '存货规格', align: "center"},
          { dataKey: "lm", title: '同比', align: "center"},
          { dataKey: "ly", title: '环比', align: "center"},
          { dataKey: "ipo", title: '投产比', align: "center"},
          { dataKey: "qty", title: '生产数量', align: "center"},
          { dataKey: "base_qty_n", title: '子件基础用量', align: "center"},
          { dataKey: "base_qty_d", title: '母件基础用量', align: "center"}
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
  },
    };