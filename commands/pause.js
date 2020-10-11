module.exports = {
  cmd: 'pause',
  description: 'Pauses the song.',
  run: ({ client }) => {
    if (client.isPlaying && client.vcd) {
      client.vcd.pause();
      client.isPlaying = false;
    }
  },
};
