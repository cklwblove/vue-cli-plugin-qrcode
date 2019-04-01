const chalk = require('chalk');
const qrcode = require('qrcode-terminal');

function generateQrcode(href) {
  let date = new Date();
  let time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  href = href + (~href.indexOf('?') ? '&t=' : '?') + Date.now();
  console.log(chalk.green('\n' + time));
  console.log(chalk.green('\n入口页面地址: ' + href));
  console.log(chalk.green('\n手机扫描以下二维码可以直接访问: '));
  qrcode.generate(href, {small: true}, function (qrcode) {
    console.log(qrcode);
  });
}

module.exports = generateQrcode;
