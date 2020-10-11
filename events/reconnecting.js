module.exports = {
  event: 'reconnecting',
  type: 'once',
  f: () => () => {
    console.log('Reconnecting...');
  },
};
