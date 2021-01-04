//Import first-party classes
import Command from "../../modules/commandapi/Command";
import { CommandCategory } from "../../modules/commandapi/CommandCategory";
import Console from "../../modules/commandapi/interpreter/Console";
import ICommandField, { CommandField } from "../../modules/commandapi/ICommandField";
import Main from "../../Main";
//Import core Node modules and dependencies
import Discord, { TextChannel, Message, Guild } from "discord.js";
import fs from 'fs';

import mongodb from 'mongodb';
import axios from 'axios';

import mongoose from 'mongoose'
import User from '../../modules/Models/User';

export default class AddRemoveMod extends Command {
	//Define the fields for the command
	private static commandFields = new CommandField(
		"togglemod", //NAME
		"Allows you to add or remove a moderator from a streamers stream", //DESCRIPTION
		"togglemod [streamer] [moderatortoadd/moderatortoremove]", //USAGE - [] = MANDATORY () = OPTIONAL
		["togglemod give xsev"], //EXAMPLES
		CommandCategory.ADMINISTRATION, //CATEGORY
		2, //MIN ARGS
		2, //MAX ARGS
		["ADMINISTRATOR"], //REQUIRED PERMS
		false, //BOT OWNER ONLY
		false, //TRUSTED ONLY
		[], //BLACKLISTED USERS
		[], //WHITELISTED GUILDS
		false, //DELETE ON FINISH
		true, //SIMULATE TYPING
		500, //SPAM TIMEOUT
		["mod", "givemod", "takemod", "addremovemod"] //ALIASES
	);

	/**
	 * Constructs a new instance of the "Test"
	 * command class
	 * @param cmdConsole The interpreter's console instance
	 */
	constructor(cmdConsole:Console){
		//Call the superclass with the command fields
		super(AddRemoveMod.commandFields, cmdConsole);
	}

	public async run(bot:Main, message:Discord.Message, args:string[], calledName:string):Promise<any> {
			let firstUser: any = await User.findOne({username: args[0]});
			if(!firstUser) return message.channel.send(`:x: The username you provided was invalid!`);

			let removeElement = function(arrayinput, elementstoremove) {
				var what, a = arguments, L = a.length, ax;
				while (L && this.length) {
					what = a[--L];
					while ((ax = this.indexOf(what)) !== -1) {
						this.splice(ax, 1);
					}
				}
				return this;
			};

			let userFound: any = await User.findOne({username: args[1]});
			if(!userFound) return message.channel.send(`:x: The username you provided was invalid!`);

			if(firstUser.moderators.includes(userFound.username)){
				firstUser.moderators = await removeElement(firstUser.moderators, userFound.username);
				firstUser.save();
				return message.reply(`:white_check_mark: Removed moderator ranking to **${userFound.username}** for channel **${firstUser.username}**`)
			}
			else {
				firstUser.moderators.push(userFound.username);
				firstUser.save();
				return message.reply(`:white_check_mark: Gave moderator ranking to **${userFound.username}** for channel **${firstUser.username}**`)
			}

		}
	}