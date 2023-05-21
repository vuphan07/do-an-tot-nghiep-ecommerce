const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
  lessVarsFilePath: './assets/styles/antd.less',
  webpack(config) {
    return config;
  },
});
