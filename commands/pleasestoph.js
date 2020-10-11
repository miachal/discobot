module.exports = {
  cmd: 'pleasestoph',
  description: 'Clears queue and stops music.',
  run: ({ client }) => {
    client.queue.length = 0;

    if (client.isPlaying && client.vcd) {
      client.vcd.end();
      client.isPlaying = false;
    }
  },
};
