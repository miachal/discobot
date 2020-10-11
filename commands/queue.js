const { MessageEmbed } = require('discord.js');
const { parseSeconds } = require('../utils/time');

module.exports = {
  cmd: 'queue',
  description: 'Shows actual queue.',
  run: ({ msg, queue }) => {
    if (queue.length === 0) {
      msg.channel.send('Queue is empty. :(');
      return;
    }

    const embed = new MessageEmbed().setColor(0xff0000);

    const totalTime = queue.reduce(
      (total, { length }) => (total = total + length),
      0
    );
    embed.setTitle(
      `Positions on Queue: ${queue.length} | Total length: ${parseSeconds(
        totalTime
      )}`
    );
    const description = [];
    queue.map(({ author, length, title }, idx) => {
      description.push(
        `${idx + 1}: ${title} (${parseSeconds(length)}) by ${author}`
      );
      description.push('');
    });
    embed.setDescription(description);
    msg.channel.send(embed);
  },
};
