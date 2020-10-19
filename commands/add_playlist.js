const { MessageEmbed } = require('discord.js');
const ytpl = require('youtube-playlist');
const { checkYoutube } = require('../utils/yt');

module.exports = {
  cmd: 'add_playlist',
  description: 'Adds songs from playlist to queue.',
  run: async ({ client, msg }) => {
    if (!msg.params) return;

    const embed = new MessageEmbed()
      .setColor(0xff0000)
      .setTitle('♪ added to queue');

    const template = 'https://www.youtube.com/playlist?list=';
    const url = msg.params.startsWith('http')
      ? msg.params
      : `${template}${msg.params}`;

    try {
      const {
        data: { name, playlist },
      } = await ytpl(url, 'id', 'name');
      for (let j = 0; j < playlist.length; ++j) {
        const details = await checkYoutube(playlist[j]);
        if (details) {
          client.queue.push({
            author: msg.author.username,
            ...details,
          });
        }
      }
      embed.setDescription(`Playlist: ${name}`);
    } catch (e) {
      embed.setDescription('Some kind of error. Magic.');
    }

    msg.channel.send(embed);
  },
};
