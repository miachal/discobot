const play = require('./play');

module.exports = ({ queue, client }) => {
  const dispatch = async () => {
    if (queue.length === 0) {
      await new Promise((r) => setTimeout(r, 5000));
    }

    while (queue.length > 0) {
      const { song } = queue[0];
      await play({ client })(song);

      if (queue.length > 1) queue.shift();
    }
    dispatch();
  };
  return dispatch;
};
