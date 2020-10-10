const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const ytdl = require('ytdl-core');

const channel = 'music';
let voiceConnection;
let voiceConnectionDispatcher;
const queue = [];
let isPlaying = false;
let defaultSongObject = {};

const bot = new Discord.Client();
// const broadcast = bot.voice.createBroadcast();
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

    if (rest.startsWith('add')) {
      const [, song] = rest.split(/ (.*)/);
      await addToQueue(msg.author.username, song);
    }

    if (rest === 'queue') {
      if (queue.length === 0) {
        msg.channel.send('Queue is empty.');
        return;
      }

      queue.map(({ author, length, title }, idx) => {
        msg.channel.send(`${idx + 1}: ${title} (${length}s) by ${author}`);
      });
    }

    if (rest === 'skip') {
      queue.shift();
      voiceConnectionDispatcher.end();
    }

    if (rest === 'pleasestoph') {
      queue.length = 0;
      pause();
    }

    if (rest === 'pause') {
      if (isPlaying) {
        pause();
        msg.channel.send('Paused.');
      }
    }

    if (rest === 'resume') {
      if (!isPlaying) {
        resume();
        msg.channel.send('Resumed.');
      }
    }
  }
});

async function addToQueue(author, song) {
  const {
    videoDetails: { title: fullTitle, lengthSeconds: length },
  } = await ytdl.getBasicInfo(song);
  const title =
    fullTitle.length > 64 ? `${fullTitle.substring(0, 61)}...` : fullTitle;
  queue.push({
    author,
    title,
    length,
    song,
  });
}

function pause() {
  voiceConnectionDispatcher.pause();
  isPlaying = false;
}

function resume() {
  voiceConnectionDispatcher.resume();
  isPlaying = true;
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
        reject();
      });
  });
}

async function dispatch() {
  if (queue.length === 0) {
    await new Promise((r) => setTimeout(r, 5000));
  }

  while (queue.length > 0) {
    const { song } = queue.length === 1 ? queue[0] : queue.shift();
    await play(song);
  }

  dispatch();
}
