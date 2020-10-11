const Discord = require('discord.js');
const { channel, prefix, token } = require('./config.json');
const ytdl = require('ytdl-core');
const yts = require('yt-search');
const moment = require('moment');

let voiceConnection;
let voiceConnectionDispatcher;
const queue = [];
let isPlaying = false;

const bot = new Discord.Client();
bot.login(token);

bot.once('ready', async () => {
  console.log('Ready');
  bot.channels.cache
    .filter(({ type }) => type === 'voice')
    .filter(({ name }) => name === channel)
    .map(async (c) => {
      voiceConnection = await c.join();
    });

  dispatch();
});

bot.once('reconnecting', () => {
  console.log('Reconnecting');
});

bot.once('disconnect', () => {
  console.log('Disconnect');
});

bot.on('message', async (msg) => {
  if (!msg.guild) return;

  if (msg.content.startsWith(prefix)) {
    const rest = msg.content.slice(1);

    if (rest === 'help') {
      msg.channel.send(
        '!help, !add <yt>, !queue, !skip, !pause, !resume, !pleasestoph'
      );
    }

    if (rest.startsWith('add ')) {
      const [, song] = rest.split(/ (.*)/);
      if (!song) return;

      const ytDetails = await checkYoutube(song);
      if (ytDetails) {
        queue.push({
          author: msg.author.username,
          ...ytDetails,
        });
        return;
      }

      const { videos } = await yts(song);
      const { title, seconds, videoId } = videos[0];

      queue.push({
        author: msg.author.username,
        song: videoId,
        title: title,
        length: seconds,
      });

      // await addToQueue(msg.author.username, song);
    }

    if (rest === 'dzban') {
      const dzban = new Discord.MessageAttachment(
        'https://media.discordapp.net/attachments/714489357964410930/764785697433321502/dzbank.png?width=1080&height=608'
      );
      msg.channel.send(dzban);
    }

    if (rest.startsWith('search ') || rest.startsWith('s ')) {
      console.log('?');
      const [, song] = rest.split(/ (.*)/);
      console.log('Song: ', song);
      const { videos } = await yts(song);
      console.log('Videos: ', videos.length);
      const vids = videos
        .slice(0, 10)
        .map(({ videoId, url, title, timestamp, author: { name } }) => ({
          videoId,
          url,
          title,
          timestamp,
          author: name,
        }));

      const embed = new Discord.MessageEmbed()
        .setColor(0xff0000)
        .setTitle('YouTube results');

      vids.forEach((v) => {
        embed.addField(v.title, `${v.videoId} | ${v.timestamp} | ${v.author}`);
      });

      msg.channel.send(embed);
    }

    if (rest === 'queue' || rest === 'q') {
      if (queue.length === 0) {
        msg.channel.send('Queue is empty. :(');
        return;
      }

      const embed = new Discord.MessageEmbed().setColor(0xff0000);

      const totalTime = queue.reduce(
        (total, { length }) => (total = total + length),
        0
      );
      embed.setTitle(
        `Positions on Queue: ${queue.length} | Total length: ${parseSeconds(
          totalTime
        )}`
      );
      const description = [];
      queue.map(({ author, length, title }, idx) => {
        description.push(
          `${idx + 1}: ${title} (${parseSeconds(length)}) by ${author}`
        );
        description.push('');
      });
      embed.setDescription(description);
      msg.channel.send(embed);
    }

    if (rest === 'skip') {
      if (queue.length === 0) return;
      if (queue.length === 1) {
        msg.channel.send(
          'This is last position on queue. To clear queue type `!pleasestoph`'
        );
        return;
      }
      stop();
    }

    if (rest === 'pleasestoph') {
      queue.length = 0;
      stop();
    }

    if (rest === 'pause') {
      pause();
    }

    if (rest === 'resume') {
      resume();
    }
  }
});

async function checkYoutube(song) {
  try {
    const {
      videoDetails: { title: fullTitle, lengthSeconds: length },
    } = await ytdl.getBasicInfo(song);
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
}

function stop() {
  if (isPlaying) {
    voiceConnectionDispatcher.end();
    isPlaying = false;
  }
}

function pause() {
  if (isPlaying) {
    voiceConnectionDispatcher.pause();
    isPlaying = false;
  }
}

function resume() {
  if (!isPlaying) {
    voiceConnectionDispatcher.resume();
    isPlaying = true;
  }
}

function play(song) {
  return new Promise((resolve, reject) => {
    isPlaying = true;
    voiceConnectionDispatcher = voiceConnection
      .play(ytdl(song, { filter: 'audioonly' }), { volume: 0.5 })
      .on('finish', (f) => {
        isPlaying = false;
        resolve();
      })
      .on('error', (e) => {
        isPlaying = false;
        resolve();
      });
  });
}

async function dispatch() {
  if (queue.length === 0) {
    await new Promise((r) => setTimeout(r, 5000));
  }

  while (queue.length > 0) {
    const { song } = queue[0];
    await play(song);

    if (queue.length === 1) break;
    queue.shift();
  }

  dispatch();
}

function parseSeconds(s) {
  return moment
    .utc(moment.duration(s, 'seconds').asMilliseconds())
    .format('HH:mm:ss');
}
