const generateQrcode = require('./generateQrcode');
const internalIp = require('internal-ip');

function getLocalIp() {
  return internalIp.v4.sync();
}
module.exports = (api, options) => {
  let compiler;
  api.chainWebpack((webpackConfig) => {
    webpackConfig.plugin('webpack-compiler').use({
      apply(compiler) {
        compiler = compiler1;
      }
    });
  });

  api.configureDevServer((webpackConfig) => {
    const devServer = compiler.options.devServer;
    if (!devServer) {
      console.warn('devserver-qrcode-webpack-plugin: needs to start webpack-dev-server');
      return;
    }
    const protocol = devServer.https ? 'https' : 'http';
    const hostname = getLocalIp();
    const port = devServer.port;
    const pathname = devServer.openPage || '';
    const url = `${protocol}://${hostname}:${port}/${pathname}`;

    generateQrcode(url);
  });
};
