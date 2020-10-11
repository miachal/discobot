const { MessageAttachment } = require('discord.js');

module.exports = {
  cmd: 'dzban',
  description: 'Super secret functionality, use it at your own risk.',
  run: ({ msg }) => {
    const dzban = new MessageAttachment(
      'https://media.discordapp.net/attachments/714489357964410930/764785697433321502/dzbank.png?width=1080&height=608'
    );
    msg.channel.send(dzban);
  },
};
