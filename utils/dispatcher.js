const play = require('./play');

module.exports = ({ client }) => {
  const dispatch = async () => {
    if (client.queue.length === 0) {
      await new Promise((r) => setTimeout(r, 5000));
    }

    while (client.queue.length > 0) {
      const { song } = client.queue[0];
      await play({ client })(song);

      if (client.queue.length > 1) client.queue.shift();
    }
    dispatch();
  };
  return dispatch;
};
