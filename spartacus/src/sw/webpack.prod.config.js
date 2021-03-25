const webpackDevConfig = require("./webpack.dev.config");

module.exports = Object.assign({}, webpackDevConfig, {
  mode: "production",
});
