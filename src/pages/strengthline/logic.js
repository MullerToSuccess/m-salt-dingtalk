export default {
    defalut(props) {
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
    };