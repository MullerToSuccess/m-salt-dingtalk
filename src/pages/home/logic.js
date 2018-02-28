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
    console.log(4545454545);
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
      xAxis: {},
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
      xAxis: {},
      series: [
        {
          type: "bar"
        },
        {
          type: "bar"
        }
      ]
    };
    console.log(666666, option);
    setState({
      option
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
