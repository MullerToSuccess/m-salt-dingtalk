module.exports = function webpackConfig(config, webpack) {
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: 'app',//公用
      minChunks: Infinity,
      // minChunks: 2,
      // filename:'app.js',
      // chunks:['home','finance','inoutput','strengthline','ding']//选择提取公共的部分打包到app.js中
    }));


  //如果要上传到线上的服务器，也就是我们的8080/dingtalk下的路径下：
  //修改publicPath:
  // config.output.publicPath = process.env.NODE_ENV === 'production'
  // ? config.build.assetsPublicPath
  // : config.dev.assetsPublicPath
  
  // config.build.assetsPublicPath = './dingtalk/dist/';//生产环境下路径
  // config.dev.assetsPublicPath = './dist/';//开发环境下路径

  // 清除注释
  // config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  //   output:{
  //     comments:false
  //   },
  //   compress:{
  //     warnings:false
  //   }
  // }));
 

  config.externals = [{
    lie: 'window.Promise',
    react: 'window.React',
    'react-dom': 'window.ReactDOM || window.React',
    'react-router': 'window.ReactRouter',
    fastclick: 'window.FastClick',
    lodash: 'window._',
  }];
  // config.devtool = '#source-map';//配置source-map

  if (process.argv[2] === 'server') {
    config.externals.push((context, request, callback, matches) => {
      if (matches = /saltui\/lib\/(\w+)/.exec(request)) {
        callback(null, `window.SaltUI.${matches[1]}`);
      } else if (matches = /react\-addons((\-\w+)+)/.exec(request)) {
        const addon = matches[1].replace(/\-((\w)(\w+))/g, (p, p1, p2, p3) =>
          (!/^(css|dom|umd)$/.test(p1) ? p2.toUpperCase() + p3 : p1.toUpperCase())
        );
        callback(null, `window.React.addons.${addon}`);
      } else {
        callback();
      }
    });
  } else {
    config.module.loaders.forEach((n) => {
      if (/\.css/.test(n.test)) {
        delete n.include;
      }
    });
  }
};
