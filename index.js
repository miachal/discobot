const { readdirSync } = require('fs');
const { join } = require('path');

const { Client } = require('discord.js');

const dispatcher = require('./utils/dispatcher');
const { token } = require('./config');

const client = new Client();
client.dispatcher = dispatcher({
  client,
});
client.queue = [];
client.isPlaying = false;
client.commands = {};
client.events = [];
client.vcd = undefined;
client.vc = undefined;

const commandsPath = join(__dirname, 'commands');
const eventsPath = join(__dirname, 'events');

readdirSync(eventsPath).map((file) => {
  const { event, type, f } = require(join(eventsPath, file));
  client.events.push({ event, type, f });
});

readdirSync(commandsPath).map((file) => {
  const { cmd, description, run } = require(join(commandsPath, file));
  client.commands[cmd] = { description, run };
});

client.events.forEach((e) => {
  client[e.type](e.event, e.f(client));
});

client.login(token);
