module.exports = {
  event: 'disconnect',
  type: 'once',
  f: () => () => {
    console.log('Disconnected.');
  },
};
