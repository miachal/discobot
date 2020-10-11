const moment = require('moment');

module.exports = {
  parseSeconds: (s) =>
    moment
      .utc(moment.duration(s, 'seconds').asMilliseconds())
      .format('HH:mm:ss'),
};
