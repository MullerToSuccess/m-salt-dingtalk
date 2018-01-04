export default {
  defaults() {
    return {
      loaded: false,
      list: [],
      error: false,
    };
  },
  //异步，其中的await 只在promise 返回了对象后才执行
  //解决异步请求的嵌套和闭包问题
  async fetchUser({ fn, setState }, workNo) {
    const { list } = await fn.DB.User.getSomeInfo(workNo);
    setState({ loaded: true, list });
  },
  async fetchIcons({ fn, setState}, workNo){
    const { list } = await fn.DB.User.getIcons(workNo);
      setState({ loaded:true, list});
  }
};
