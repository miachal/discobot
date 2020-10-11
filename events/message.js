const { prefix } = require('../config');

module.exports = {
  event: 'message',
  type: 'on',
  f: (client) => async (msg) => {
    if (!msg.guild) return;
    if (msg.content.startsWith(prefix)) {
      const rest = msg.content.slice(1);
      [msg.command, msg.params] = rest.split(/ (.*)/);

      if (msg.command in client.commands) {
        await client.commands[msg.command].run({
          client,
          msg,
        });
      }
    }
  },
};
