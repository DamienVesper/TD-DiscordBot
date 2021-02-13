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

export default class AddRemoveMod extends Command {
	// Define the fields for the command
	private static commandFields = new CommandField(
	    `togglemod`, // NAME
	    `Allows you to add or remove a moderator from a streamers stream`, // DESCRIPTION
	    `togglemod [streamer] [moderatortoadd/moderatortoremove]`, // USAGE - [] = MANDATORY () = OPTIONAL
	    [`togglemod give xsev`], // EXAMPLES
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
	    [`mod`, `givemod`, `takemod`, `addremovemod`] // ALIASES
	);

	/**
	 * Constructs a new instance of the "Test"
	 * command class
	 * @param cmdConsole The interpreter's console instance
	 */
	constructor (cmdConsole:Console) {
	    // Call the superclass with the command fields
	    super(AddRemoveMod.commandFields, cmdConsole);
	}

	public async run (bot:Main, message:Discord.Message, args:string[], calledName:string):Promise<any> {
	    const firstUser: any = await User.findOne({ username: args[0] });
	    if (!firstUser) return message.channel.send(`:x: The username you provided was invalid!`);

	    async function asyncForEach<T> (array:T[], callback:any): Promise<void> {
	        for (let index = 0; index < array.length; index++) {
	            await callback(array[index], index, array);
	        }
	    }

	    async function removeElement (array, elementToRemove) {
	        let i = 0;
	        const emptyArr = [];
	        await asyncForEach(array, item => {
	            if (elementToRemove == item) emptyArr.push(i);
	            i++;
	        });

	        await asyncForEach(emptyArr, item => {
	            if (item > -1) {
	                array.splice(item, 1);
					  }
	        });
	    }

	    const userFound: any = await User.findOne({ username: args[1] });
	    if (!userFound) return message.channel.send(`:x: The username you provided was invalid!`);

	    if (firstUser.channel.moderators.includes(userFound.username)) {
	        firstUser.channel.moderators = await removeElement(firstUser.channel.moderators, userFound.username);
	        firstUser.save();
	        return message.reply(`:white_check_mark: Removed moderator ranking to **${userFound.username}** for channel **${firstUser.username}**`);
	    }
	    else {
	        firstUser.channel.moderators.push(userFound.username);
	        firstUser.save();
	        return message.reply(`:white_check_mark: Gave moderator ranking to **${userFound.username}** for channel **${firstUser.username}**`);
	    }
	}
}
