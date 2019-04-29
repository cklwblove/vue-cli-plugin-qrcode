const chalk = require('chalk');
const qrCode = require('qrcode-terminal');
const internalIp = require('internal-ip');

function showHostWarning() {
  console.log(chalk.yellow('devServer.host must be "0.0.0.0" for QR Code to work'));
  console.log(chalk.yellow('QR Code will not be displayed :('));
}

function showDevServerWarning() {
  console.log(chalk.yellow('[vue-cli-plugin-qrcode] No devServer config found'));
  console.log(chalk.yellow('[vue-cli-plugin-qrcode] No QR code will be displayed'));
}

module.exports = (api, options) => {
  api.chainWebpack((webpackConfig) => {
    webpackConfig.plugin('qrcode-webpack-compiler')
      .use({
        apply(compiler, callback) {
          if (process.env.NODE_ENV === 'development') {
            if (options.devServer) {
              compiler.hooks.afterEmit.tap('Print QR Code Plugin', () => {
                const protocol = options.devServer.https ? 'https' : 'http';
                const port = options.devServer.port || '';
                const isHostCorrect =
                  options.devServer.host.trim() === '0.0.0.0';

                if (!isHostCorrect) {
                  showHostWarning();
                  callback && callback();
                  return;
                }

                internalIp.v4().then((ip) => {
                  let address = `${protocol}://${ip}${port && `:${port}`}`;
                  const date = new Date();
                  const time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                  address = address + (~address.indexOf('?') ? '&t=' : '?') + Date.now();
                  console.log(chalk.green('\n' + time));
                  console.log(chalk.green('\n入口页面地址: ' + address));
                  console.log(chalk.green('\n手机扫描以下二维码可以直接访问: '));
                  qrCode.generate(address, {small: 'true'}, (code) => {
                    // console.log(code);
                    callback && callback();
                  });
                }).catch((err) => {
                  console.log(err);
                  return callback && callback(err);
                });
              });
            } else {
              showDevServerWarning();
              callback && callback();
            }
          } else {
            // console.log(chalk.yellow('[vue-cli-plugin-qrcode] process.env.NODE_ENV value must be development'));
          }
        }
      });
  });
};
