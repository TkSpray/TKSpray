const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://starstudio.uestc.edu.cn/kase',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': '/'
  //       }
  //     }
  //   }
  // },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
  }
}
