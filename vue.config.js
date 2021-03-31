const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    disableHostCheck: true,
    // proxy: {
    //   [process.env.VUE_APP_API]: {
    //     target: process.env.VUE_API_DEV_TARGET, //API服务器的地址
    //     changeOrigin: true,
    //     pathRewrite: {
    //       [`^${process.env.VUE_APP_API}`]: "",
    //     },
    //   },
    // },
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'http://localhost:8088',   //代理接口
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/yuanlv'    //代理的路径
        }
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@a", resolve("src/assets"))
      .set("@c", resolve("src/components"))
      .set("@u", resolve("src/utils"))
  },
};
