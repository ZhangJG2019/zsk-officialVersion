// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 1111,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/front': {
        // target: 'http://192.168.1.157:8084', // 夏哥
        // target: 'http://192.168.1.156:8080', // 彪哥
        // target: 'http://192.168.1.192:8084', // 江哥
        target: 'http://192.168.1.40', //测试服务器2
        // target: 'http://47.105.75.254:8084', // 正式服务器1
        changeOrigin: true,
        // pathRewrite: {
        //   '^/front': '/' // 通过pathRewrite重写地址，将前缀/front转为/
        // }
      },
      '/apis': {
        // target: 'http://47.105.75.254:8084', // 正式服务器1
        // target: 'http://192.168.1.40', // 测试服务器有nginx
        target: 'http://192.168.1.156:8080', // 彪哥
        // target: 'http://192.168.1.192:8080', // 江哥
        changeOrigin: true,
        pathRewrite: {
          '^/apis': '/' // 通过pathRewrite重写地址，将前缀/front转为/
        }
      }
      // ,
      // '/hall': {
      //   target: 'http://192.168.1.160:8080', // 测试服务器47.105.75.254
      //   // target: 'http://47.105.75.254:8080', // 测试服务器
      //   changeOrigin: true,
      //   // pathRewrite: {
      //   //   '^/hall': '/' // 通过pathRewrite重写地址，将前缀/front转为/
      //   // }
      // }
    },

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
