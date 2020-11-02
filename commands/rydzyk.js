const { MessageAttachment } = require('discord.js');

module.exports = {
  cmd: 'rydzyk',
  description: 'the chosen one ✞',
  run: ({ msg }) => {
    const imgs = [
      'https://bi.im-g.pl/im/73/16/19/z26307955V,Ojciec-Tadeusz-Rydzyk.jpg',
      'https://static.wirtualnemedia.pl/media/top/tadeuszrydzyk2018-655.png',
      'https://upload.wikimedia.org/wikipedia/commons/3/37/Ojciec_Tadeusz_Rydzyk_%282013%29.jpg',
      'https://www.rp.pl/apps/pbcsi.dll/storyimage/RP/20200314/KRAJ/200319473/AR/0/AR-200319473.jpg',
      'https://cdn.innpoland.pl/5007282144f9cb214ad2f84569533d26,1003,0,0,0.jpg',
      'https://cdn.galleries.smcloud.net/t/galleries/gf-Ssnb-utZa-J5JT_tak-zmienial-sie-ojciec-rydzyk-2013-1920x1080-nocrop.jpg',
      'https://cdn.galleries.smcloud.net/t/galleries/gf-oTRZ-zJqp-yyQH_ojciec-tadeusz-rydzyk-664x442-nocrop.jpg',
      'https://bi.im-g.pl/im/1e/16/19/z26304542V,Ojciec-Tadeusz-Rydzyk-podczas-mszy-swietej-.jpg',
      'https://cdn.galleries.smcloud.net/t/galleries/gf-B3y8-SXe7-sE7d_tadeusz-rydzyk-664x442-nocrop.JPG',
      'https://gfx.planeta.pl/var/planetapl/storage/images/wiadomosci/swiat/ministerstwo-znow-placi-rydzykowi-ogromna-suma-na-piknik-radia-maryja/2987704-1-pol-PL/Strumien-plynie-do-Rydzyka.-Skad-Z-rzadu!-Znow-bedziecie-wsciekli_size-360x270.png',
      'https://cdn.galleries.smcloud.net/t/galleries/gf-26x2-45Kz-84Eu_tadeusz-rydzyk-664x442-nocrop.jpg',
    ];
    msg.channel.send(
      new MessageAttachment(imgs[(Math.random() * imgs.length) | 0])
    );
  },
};
