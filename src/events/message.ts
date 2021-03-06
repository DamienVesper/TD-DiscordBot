import { bot, cmdInterpreter } from '../index';
import Spliterator from '../util/Spliterator';
import StringUtil from '../util/StringUtil';

import { Message, TextChannel } from 'discord.js';
const config = bot.config;
const fs = require(`fs`);

// On the message being sent
bot.on(`message`, async (message: Message) => {
    if (!message.guild) return;
    if (message.channel.type === `dm`) return;

    // Get the prefixes
    const prefix:string = config.prefix;

    // Get the contents of the message
    const msgCont:string = (message.content.toLowerCase());

    // Check if a valid command prefix was passed
    if (msgCont.startsWith(prefix.toLowerCase())) {
        // Split the incoming command using the spliterator
        let messageArgs:string[] = (await Spliterator.split(message.content));

        // Check if the message args begins with the configured prefix
        if (msgCont.startsWith(prefix.toLowerCase())) {
            // Slice the prefix out of the first array element
            messageArgs[0] = (await messageArgs[0].slice(prefix.length));
        } else {
            // Slice the first array element entirely
            messageArgs = (await messageArgs.slice(1, (messageArgs.length)));
        }

        // Get the base command
        const baseCommand:string = messageArgs[0];

        // Pass the command arguments to the interpreter
        await cmdInterpreter.execute(message, messageArgs);
    }
    // End Event
});
