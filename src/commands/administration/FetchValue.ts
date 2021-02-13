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

export default class FetchValue extends Command {
    // Define the fields for the command
    private static commandFields = new CommandField(
        `fetchvalue`, // NAME
        `Allows you to fetch a data value from a user`, // DESCRIPTION
        `fetchvalue [username] [data value]`, // USAGE - [] = MANDATORY () = OPTIONAL
        [`fetchvalue xsev isStaff`], // EXAMPLES
        CommandCategory.ADMINISTRATION, // CATEGORY
        2, // MIN ARGS
        2, // MAX ARGS
        [`ADMINISTRATOR`], // REQUIRED PERMS
        false, // BOT OWNER ONLY
        false, // TRUSTED ONLY
        [], // BLACKLISTED USERS
        [], // WHITELISTED GUILDS
        false, // DELETE ON FINISH
        true, // SIMULATE TYPING
        500, // SPAM TIMEOUT
        [`fetchdata`, `data`] // ALIASES
    );

    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor (cmdConsole:Console) {
        // Call the superclass with the command fields
        super(FetchValue.commandFields, cmdConsole);
    }

    public async run (bot:Main, message:Discord.Message, args:string[], calledName:string):Promise<any> {
        if (message.channel.id !== `794326024858763304`) return message.reply(`:x: This command can only be used in <#794326024858763304>`);

        const userFound: any = await User.findOne({ username: args[0] });
        if (!userFound) return message.channel.send(`:x: The username you provided was invalid!`);

        const bannedValues = [`password`];
        if (bannedValues.includes(args[1].toLowerCase())) return message.reply(`:x: You cannot request this data value!`);
        else return message.reply(`:information_source: Value **${args[1]}** of user **${userFound.username}** is **${userFound[`${args[1]}`]}**`);
    }
}
