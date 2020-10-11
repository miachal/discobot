const { MessageEmbed } = require('discord.js');

const { version } = require('../config.json');

module.exports = {
  cmd: 'version',
  description: 'Shows actual version.',
  run: ({ msg }) => {
    const embed = new MessageEmbed().setColor(0x00ff00).setTitle('♪ discobot');
    embed.addField('Version', version);
    embed.addField('Github', 'github.com/miachal/discobot');
    msg.channel.send(embed);
  },
};
