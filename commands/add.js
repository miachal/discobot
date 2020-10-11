const yts = require('yt-search');
const { checkYoutube } = require('../utils/yt');

module.exports = {
  cmd: 'add',
  description: 'Adds song to the play queue.',
  run: async ({ msg, queue }) => {
    if (!msg.params) return;

    const ytDetails = await checkYoutube(msg.params);
    if (ytDetails) {
      queue.push({
        author: msg.author.username,
        ...ytDetails,
      });
      return;
    }

    const { videos } = await yts(msg.params);
    const { title, seconds, videoId } = videos[0];

    queue.push({
      author: msg.author.username,
      song: videoId,
      title: title,
      length: seconds,
    });
  },
};
