export default {
    // defaults(props) {
    //   return {
    //     loaded: false,
    //     option: [],
    //     list:[],
    //     error: false,
    //   };
    // },

    // async fetchUser({ fn, setState }, workNo) {
    //   const { list } = await fn.DB.User.getSomeInfo(workNo);
    //   setState({ loaded: true, list });
    // },
    // async fetchIcons({ fn, setState}, workNo){
    //   const { list } = await fn.DB.User.getIcons(workNo);
    //     setState({ loaded:true, list});
    // }
    // async fetchCategory({ fn, setState}){
    //   const { list } = await fn.DB.Category.getCategory();

    //     // setState({ loaded:true, list});
    // },
    defalut(props){
        return{
            option:[],
            tabItems,
            accord,
            organization
        }
    },
    async fetchEchartOption({fn, setState}){
        const { option, tabItems } = await fn.DB.Option.getEchartOption();
        setState({
            option
        });
        
        // try {
            
        //     fn.message.success('Echart的配置获取成功');
        //   } catch(e) {
        //     fn.message.error(`Echart的配置的获取不成功:${e.errorMsg}`);
        //   }
    },
    async fetchTabItems({fn, setState}){
        const {tabItems} = await fn.DB.Option.getTabItems();
        setState({
            tabItems:tabItems
        })
    },
    async fetchDataAccord({fn, setState}){
        const {accord,option} = await fn.DB.Data.getAccord();
        setState({
            accord,
            option
        });
        
    },
    async fetchDataOrganization({fn, setState}){
        const {organization} = await fn.DB.Data.getOrganization();
        setState({
            organization
        })
    }
    

  };
  