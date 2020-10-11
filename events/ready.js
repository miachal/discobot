const { channel } = require('../config');

module.exports = {
  event: 'ready',
  type: 'once',
  f: (client) => () => {
    console.log('Ready');
    client.channels.cache
      .filter(({ type }) => type === 'voice')
      .filter(({ name }) => name === channel)
      .map(async (channel) => {
        client.vc = await channel.join();
      });

    client.dispatcher();
  },
};
