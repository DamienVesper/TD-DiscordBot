// Import first-party classes
import Command from "../../modules/commandapi/Command";
import { CommandCategory } from "../../modules/commandapi/CommandCategory";
import Console from "../../modules/commandapi/interpreter/Console";
import ICommandField, { CommandField } from "../../modules/commandapi/ICommandField";
import MathUtil from "../../util/MathUtil";
import Main from "../../Main";

// Import core Node modules and dependencies
import Discord, { GuildMember, MessageEmbed, TextChannel, Message } from "discord.js";
import fs, { WriteStream } from 'fs';
import axios from 'axios';

export default class Ping extends Command {
    // Define the fields for the command
    private static commandFields = new CommandField(
        `ping`, // NAME
        `Pong!`, // DESCRIPTION
        `ping [none]`, // USAGE - [] = MANDATORY () = OPTIONAL
        [`ping [none]`], // EXAMPLES
        CommandCategory.CORE, // CATEGORY
        0, // MIN ARGS
        0, // MAX ARGS
        [], // REQUIRED PERMS
        false, // BOT OWNER ONLY
        false, // TRUSTED ONLY
        [], // BLACKLISTED USERS
        [], // WHITELISTED GUILDS
        false, // DELETE ON FINISH
        true, // SIMULATE TYPING
        5000, // SPAM TIMEOUT
        [] // ALIASES
    );

    constructor (cmdConsole:Console) {
        // Call the superclass with the command fields
        super(Ping.commandFields, cmdConsole);
    }

    public async run (bot:Main, message:Discord.Message, args:string[], calledName:string):Promise<any> {
        // Assert the argument count
        super.assertArgCount(args.length, message);

        const m = await message.channel.send(`:hourglass: Please wait...`) as Message;
        const timeInBetween = m.createdTimestamp - message.createdTimestamp;
        return m.edit(`:information_source: Main Command API Latency is ${timeInBetween} MS.`);
    }
}
