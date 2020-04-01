
module.exports = {

  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md

  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  chainWebpack: () => { },
  configureWebpack: () => { },
  // 配置 webpack-dev-server 行为。
  devServer: {
    host: '127.0.0.1',// 192.168.2.108
    port: 8080,
    https: false,
    hotOnly: false,
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
    proxy: null, // string | Object
    before: app => { }
  }
}
