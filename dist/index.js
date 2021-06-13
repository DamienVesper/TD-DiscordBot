"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cmdInterpreter = exports.cmdConsole = exports.bot = void 0;
const EventLoader_1 = require("./events/EventLoader");
const Main_1 = __importDefault(require("./Main"));
const Console_1 = __importDefault(require("./modules/commandapi/interpreter/Console"));
const Interpreter_1 = __importDefault(require("./modules/commandapi/interpreter/Interpreter"));
// Create a new bot instance
exports.bot = new Main_1.default({
    fetchAllMembers: true
});
// Create a new console instance
exports.cmdConsole = new Console_1.default();
// Create a new interpreter instance
exports.cmdInterpreter = new Interpreter_1.default(exports.bot, exports.cmdConsole);
// AUTOMATIC COMMAND INITIALIZATION
const commandHandler = require(`./commands/CommandLoader`);
commandHandler.loadCommands(); // Load in all of the commands
// Initialize the event handlers
const eventManager = new EventLoader_1.eventHandler(exports.bot, exports.cmdInterpreter);
// Monitor discord WS events
exports.bot.on(`error`, async (error) => {
    return console.log(`[WS ERROR] ${exports.bot.config.botName} has encountered a websocket error! The error is: ${error.name} (Stack: ${error.stack})`);
});
exports.bot.on(`shardReconnecting`, async () => {
    return console.log(`[WS RECONNECTING] ${exports.bot.config.botName} is attempting to reconnect to discord!`);
});
exports.bot.on(`shardResume`, async (replayed) => {
    return console.log(`[WS RECONNECTED] ${exports.bot.config.botName} has reconnected! Replays: ${replayed}`);
});
// Attempt to login to the bot
try {
    exports.bot.login(exports.bot.config.token);
}
catch (error) {
    console.log(`[CRITICAL ERROR] There was an error logging into the bot! Stack: ${error.stack} (${error})`);
    process.exit(1);
}
//# sourceMappingURL=index.js.map