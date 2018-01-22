export default {
  defalut(props) {
      return {
        tabItems
      };
    },
    async fetchTabItems({fn, setState}){
      const {tabItems} = await fn.DB.Option.getTabItems();
      console.log(333333333333333333333,tabItems);
      const defaultItems = [];
      const moreItems = [];
      tabItems.forEach(function(item){
          if(item.isDefault) defaultItems.push(item);
          else moreItems.push(item);
      });
      console.log(defaultItems);
      console.log(moreItems);
      //遍历tabItems将菜单分为default和more
      setState({
          defaultItems:defaultItems,
          moreItems:moreItems
      })
  },
  };