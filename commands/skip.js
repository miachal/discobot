module.exports = {
  cmd: 'skip',
  description: 'Skips actual song.',
  run: ({ client, queue }) => {
    if (queue.length <= 1) return;

    if (client.isPlaying && client.vcd) {
      client.vcd.end();
      client.isPlaying = false;
    }
  },
};
