const Merge = require("webpack-merge");
const CommonConfig = require("./webpack.base.config");

module.exports = Merge(CommonConfig, {
  output: {
    publicPath: "https://localhost:9001/dist"
  },
  devServer: {
    contentBase: __dirname,
    port: 9001,
    https: true
    //hotOnly: true,
    //inline: true
  }
});
