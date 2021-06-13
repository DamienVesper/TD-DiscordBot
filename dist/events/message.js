"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Spliterator_1 = __importDefault(require("../util/Spliterator"));
const config = index_1.bot.config;
const fs = require(`fs`);
// On the message being sent
index_1.bot.on(`message`, async (message) => {
    if (!message.guild)
        return;
    if (message.channel.type === `dm`)
        return;
    // Get the prefixes
    const prefix = config.prefix;
    // Get the contents of the message
    const msgCont = (message.content.toLowerCase());
    // Check if a valid command prefix was passed
    if (msgCont.startsWith(prefix.toLowerCase())) {
        // Split the incoming command using the spliterator
        let messageArgs = (await Spliterator_1.default.split(message.content));
        // Check if the message args begins with the configured prefix
        if (msgCont.startsWith(prefix.toLowerCase())) {
            // Slice the prefix out of the first array element
            messageArgs[0] = (await messageArgs[0].slice(prefix.length));
        }
        else {
            // Slice the first array element entirely
            messageArgs = (await messageArgs.slice(1, (messageArgs.length)));
        }
        // Get the base command
        const baseCommand = messageArgs[0];
        // Pass the command arguments to the interpreter
        await index_1.cmdInterpreter.execute(message, messageArgs);
    }
    // End Event
});
//# sourceMappingURL=message.js.map