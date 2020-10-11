const { MessageEmbed } = require('discord.js');

module.exports = {
  cmd: 'help',
  description: 'List available commands with description.',
  run: ({ client, msg }) => {
    const embed = new MessageEmbed().setColor(0xff0000).setTitle('♪');

    Object.keys(client.commands).forEach((cmd) => {
      embed.addField(cmd, client.commands[cmd].description);
    });

    msg.channel.send(embed);
  },
};
