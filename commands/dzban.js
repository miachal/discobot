const { MessageAttachment } = require('discord.js');

module.exports = {
  cmd: 'dzban',
  description: 'Super secret functionality, use it at your own risk.',
  run: ({ msg }) => {
    const dzban = [
      'https://media.discordapp.net/attachments/714489357964410930/764785697433321502/dzbank.png',
      'https://cdn.discordapp.com/attachments/714489357964410930/770762543030861854/dzban_2.0.png',
    ];
    msg.channel.send(
      new MessageAttachment(dzban[(Math.random() * dzban.length) | 0])
    );
  },
};
