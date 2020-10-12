const ytdl = require('ytdl-core');

module.exports = ({ client }) => async (song) =>
  new Promise((resolve) => {
    client.isPlaying = true;
    client.vcd = client.vc
      .play(
        ytdl(song, {
          filter: 'audioonly',
          quality: 'highestaudio',
          highWaterMark: 1 << 25,
          requestOptions: {
            maxRetries: 3,
            maxReconnects: 3,
          },
        }),
        { volume: 0.5 }
      )
      .on('finish', () => {
        client.isPlaying = false;
        resolve();
      })
      .on('error', () => {
        client.isPlaying = false;
        resolve();
      });
  });
