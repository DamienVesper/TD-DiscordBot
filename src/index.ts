// Import core Node modules and dependencies
import axios from 'axios';
import * as Discord from 'discord.js';

import fs from 'fs';
import { eventHandler } from './events/EventLoader';
import Main from './Main';

import Console from './modules/commandapi/interpreter/Console';
import Interpreter from './modules/commandapi/interpreter/Interpreter';

// Create a new bot instance
export const bot:Main = new Main({
    fetchAllMembers: true
});

// Create a new console instance
export const cmdConsole:Console = new Console();

// Create a new interpreter instance
export const cmdInterpreter:Interpreter = new Interpreter(bot, cmdConsole);

// AUTOMATIC COMMAND INITIALIZATION
const commandHandler = require(`./commands/CommandLoader`);
commandHandler.loadCommands(); // Load in all of the commands

// Initialize the event handlers
const eventManager = new eventHandler(bot, cmdInterpreter);

// Monitor discord WS events
bot.on(`error`, async (error) => {
    return console.log(`[WS ERROR] ${bot.config.botName} has encountered a websocket error! The error is: ${error.name} (Stack: ${error.stack})`);
});

bot.on(`shardReconnecting`, async () => {
    return console.log(`[WS RECONNECTING] ${bot.config.botName} is attempting to reconnect to discord!`);
});

bot.on(`shardResume`, async (replayed) => {
    return console.log(`[WS RECONNECTED] ${bot.config.botName} has reconnected! Replays: ${replayed}`);
});

// Attempt to login to the bot
try {
    bot.login(bot.config.token);
} catch (error) {
    console.log(`[CRITICAL ERROR] There was an error logging into the bot! Stack: ${error.stack} (${error})`);
    process.exit(1);
}
