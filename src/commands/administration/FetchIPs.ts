// Import first-party classes
import Command from "../../modules/commandapi/Command";
import { CommandCategory } from "../../modules/commandapi/CommandCategory";
import Console from "../../modules/commandapi/interpreter/Console";
import ICommandField, { CommandField } from "../../modules/commandapi/ICommandField";
import Main from "../../Main";
// Import core Node modules and dependencies
import Discord, { TextChannel, Message, Guild } from "discord.js";
import fs from 'fs';

import mongodb from 'mongodb';
import axios from 'axios';

import mongoose from 'mongoose';
import User from '../../modules/Models/User';
import Sticker from '../../modules/Models/Sticker';
import { userInfo } from "os";

export default class FetchIPs extends Command {
    // Define the fields for the command
    private static commandFields = new CommandField(
        `fetchips`, // NAME
        `Gets user ips`, // DESCRIPTION
        `fetchemail [stickername]`, // USAGE - [] = MANDATORY () = OPTIONAL
        [`fetchemail sev`], // EXAMPLES
        CommandCategory.ADMINISTRATION, // CATEGORY
        1, // MIN ARGS
        1, // MAX ARGS
        [`ADMINISTRATOR`], // REQUIRED PERMS
        false, // BOT OWNER ONLY
        false, // TRUSTED ONLY
        [], // BLACKLISTED USERS
        [], // WHITELISTED GUILDS
        false, // DELETE ON FINISH
        true, // SIMULATE TYPING
        500, // SPAM TIMEOUT
        [`getip`, `ips`, `ip`, `fetchip`] // ALIASES
    );

    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor (cmdConsole:Console) {
        // Call the superclass with the command fields
        super(FetchIPs.commandFields, cmdConsole);
    }

    public async run (bot:Main, message:Discord.Message, args:string[], calledName:string):Promise<any> {
        // Assert the argument count
        super.assertArgCount(args.length, message);

        if (message.channel.id !== `794326024858763304`) return message.reply(`:x: This command can only be used in <#794326024858763304>`);

        const userFound: any = await User.findOne({ username: args[0] });
        if (!userFound) return message.channel.send(`:x: The username you provided was invalid!`);

        const ips = [userFound.creationIP, userFound.lastIP];
        const ipText = ips.join(` & `);

        if (userFound.perms.staff) return message.reply(`:x: That user is a staff member! I cannot fetch their IP addresses for safety reasons.`);
        message.reply(`:white_check_mark: The ips found under user **${userFound.username}** are ||${ipText}||`);
    }
}
