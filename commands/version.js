const { version } = require('../config.json');

module.exports = {
  cmd: 'version',
  description: 'Shows actual version.',
  run: ({ msg }) => {
    msg.channel.send('Version: ', version);
  },
};
