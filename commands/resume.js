module.exports = {
  cmd: 'resume',
  description: 'Resumes the song.',
  run: ({ client }) => {
    if (!client.isPlaying && client.vcd) {
      client.vcd.resume();
      client.isPlaying = true;
    }
  },
};
