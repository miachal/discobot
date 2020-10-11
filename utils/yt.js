const { getBasicInfo } = require('ytdl-core');

module.exports = {
  checkYoutube: async (song) => {
    try {
      const {
        videoDetails: { title: fullTitle, lengthSeconds: length },
      } = await getBasicInfo(song);
      const title =
        fullTitle.length > 64 ? `${fullTitle.substring(0, 61)}...` : fullTitle;
      return {
        title,
        fullTitle,
        length,
        song,
      };
    } catch (e) {
      return false;
    }
  },
};
