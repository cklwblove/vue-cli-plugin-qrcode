module.exports = (api) => {
  api.extendPackage({
    devDependencies: {
      'chalk': '^2.4.2',
      'internal-ip': '^4.2.0',
      'qrcode-terminal': '^0.12.0'
    }
  });
};
