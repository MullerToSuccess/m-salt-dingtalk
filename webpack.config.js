module.exports = function webpackConfig(config, webpack) {
  config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'app',
    minChunks: Infinity,
  }));
  // module:{
  //   loaders: [
  //     { test: /\.(png|jpg|jpeg|gif)$/, loader: "url-loader?limit=8192&name=[name].[ext]&outputPath=img/&publicPath=../" }
  // ]
  // }

  config.externals = [{
    lie: 'window.Promise',
    react: 'window.React',
    'react-dom': 'window.ReactDOM || window.React',
    'react-router': 'window.ReactRouter',
    fastclick: 'window.FastClick',
    lodash: 'window._',
  }];
  
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
