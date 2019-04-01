const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@/utils', path.resolve(__dirname, 'src/util'))
      .set('@/router', path.resolve(__dirname, 'src/router.js'))
  }
}
