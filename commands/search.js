const { MessageEmbed } = require('discord.js');
const yts = require('yt-search');

module.exports = {
  cmd: 'search',
  description: 'Searches for the specified audio (currently only YT service).',
  run: async ({ msg }) => {
    if (!msg.params) return;

    const { videos } = await yts(msg.params);
    const vids = videos
      .slice(0, 10)
      .map(({ videoId, url, title, timestamp, author: { name } }) => ({
        videoId,
        url,
        title,
        timestamp,
        author: name,
      }));

    const embed = new MessageEmbed()
      .setColor(0xff0000)
      .setTitle('YouTube results');

    vids.forEach(({ title, videoId, timestamp, author }) => {
      embed.addField(title, `${videoId} | ${timestamp} | ${author}`);
    });

    msg.channel.send(embed);
  },
};
