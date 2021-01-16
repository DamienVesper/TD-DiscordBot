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

export default class ResetChatKey extends Command {
	//Define the fields for the command
	private static commandFields = new CommandField(
		"resetchatkey", //NAME
		"Resets a users chat key", //DESCRIPTION
		"resetchatkey [username]", //USAGE - [] = MANDATORY () = OPTIONAL
		["resetchatkey xsev"], //EXAMPLES
		CommandCategory.ADMINISTRATION, //CATEGORY
		1, //MIN ARGS
		1, //MAX ARGS
		["ADMINISTRATOR"], //REQUIRED PERMS
		false, //BOT OWNER ONLY
		false, //TRUSTED ONLY
		[], //BLACKLISTED USERS
		[], //WHITELISTED GUILDS
		false, //DELETE ON FINISH
		true, //SIMULATE TYPING
		500, //SPAM TIMEOUT
		["chatkey", "regenchatkey"] //ALIASES
	);

	/**
	 * Constructs a new instance of the "Test"
	 * command class
	 * @param cmdConsole The interpreter's console instance
	 */
	constructor(cmdConsole:Console){
		//Call the superclass with the command fields
		super(ResetChatKey.commandFields, cmdConsole);
	}

	public async run(bot:Main, message:Discord.Message, args:string[], calledName:string):Promise<any> {
			let userFound: any = await User.findOne({username: args[0]});
			if(!userFound) return message.channel.send(`:x: The username you provided was invalid!`);

			function makeid(length) {
				var result           = '';
				var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				var charactersLength = characters.length;
				for ( var i = 0; i < length; i++ ) {
				   result += characters.charAt(Math.floor(Math.random() * charactersLength));
				}
				return result;
			 }

			 let newChatKey = await makeid(64)

			 userFound.chat_key = newChatKey;
			 userFound.save();

			 return message.reply(`:white_check_mark: Reset the chat key of **${args[0]}**`);

		}
	}