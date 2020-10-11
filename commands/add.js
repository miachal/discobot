const { MessageEmbed } = require('discord.js');
const yts = require('yt-search');
const { parseSeconds } = require('../utils/time');
const { checkYoutube } = require('../utils/yt');

module.exports = {
  cmd: 'add',
  description: 'Adds song to the play queue.',
  run: async ({ msg, queue }) => {
    if (!msg.params) return;

    const embed = new MessageEmbed()
      .setColor(0xff0000)
      .setTitle('♪ added to queue');

    const ytDetails = await checkYoutube(msg.params);
    if (ytDetails) {
      queue.push({
        author: msg.author.username,
        ...ytDetails,
      });
      embed.setDescription(
        `${parseSeconds(ytDetails.length)}: ${ytDetails.fullTitle}`
      );
    } else {
      const { videos } = await yts(msg.params);
      const { title, seconds, videoId } = videos[0];

      queue.push({
        author: msg.author.username,
        song: videoId,
        title,
        length: seconds,
      });

      embed.setDescription(`${parseSeconds(seconds)}: ${title}`);
    }

    msg.channel.send(embed);
  },
};
