const Discord = require('discord.js');
const { channel, prefix, token } = require('./config.json');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const dispatcher = require('./utils/dispatcher');

const queue = [];

const client = new Discord.Client();
client.dispatcher = dispatcher({
  queue,
  client,
});
client.isPlaying = false;
client.commands = {};
client.events = [];
client.vcd = undefined;
client.vc = undefined;

const commandsPath = path.join(__dirname, 'commands');
const eventsPath = path.join(__dirname, 'events');

fs.readdirSync(eventsPath).map((file) => {
  const { event, type, f } = require(path.join(eventsPath, file));
  client.events.push({ event, type, f });
});

fs.readdirSync(commandsPath).map((file) => {
  const { cmd, description, run } = require(path.join(commandsPath, file));
  client.commands[cmd] = { description, run };
});

client.login(token);

client.events.forEach((e) => {
  client[e.type](e.event, e.f(client));
});

// client.on('message', async (msg) => {
//   if (!msg.guild) return;
//   if (msg.content.startsWith(prefix)) {
//     const rest = msg.content.slice(1);
//     [msg.command, msg.params] = rest.split(/ (.*)/);

//     if (msg.command in client.commands) {
//       await client.commands[msg.command].run({
//         client,
//         msg,
//         queue,
//       });
//     }
//   }
// });
