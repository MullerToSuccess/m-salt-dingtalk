export default {
    defaults() {
      return {
        loaded: false,
        list: [],
        error: false,
      };
    },
    async fetch({ fn, setState }, workNo) {
      const { list } = await fn.DB.User.getSomeInfo(workNo);
      setState({ loaded: true, list });//异步请求后得到list刷新state
    },
  };
  