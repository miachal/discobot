const { MessageEmbed } = require('discord.js');

const { parseSeconds } = require('../utils/time');

module.exports = {
  cmd: 'queue',
  description: 'Shows actual queue.',
  run: ({ client, msg }) => {
    if (client.queue.length === 0) {
      msg.channel.send('Queue is empty. :(');
      return;
    }

    const embed = new MessageEmbed().setColor(0xff0000);

    const totalTime = client.queue.reduce(
      (total, { length }) => total + +length,
      0
    );
    embed.setTitle(
      `Positions on Queue: ${
        client.queue.length
      } | Total length: ${parseSeconds(totalTime)}`
    );

    const description = [];
    client.queue.map(({ length, title }, idx) => {
      description.push(`${idx + 1}: ${title} (${parseSeconds(length)})`);
      description.push('');

      if (description.join('').length > 1800) {
        const last = description.pop();
        embed.setDescription(description);
        msg.channel.send(embed);

        description.length = 0;
        description.push(last);
        description.push('');
      }
    });

    embed.setDescription(description);
    msg.channel.send(embed);
  },
};
