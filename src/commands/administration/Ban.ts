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

export default class Ban extends Command {
	//Define the fields for the command
	private static commandFields = new CommandField(
		"ban", //NAME
		"Bans a user from the site", //DESCRIPTION
		"ban [username] [reason] (time in days)", //USAGE - [] = MANDATORY () = OPTIONAL
		["ban basedradio 2h"], //EXAMPLES
		CommandCategory.ADMINISTRATION, //CATEGORY
		2, //MIN ARGS
		-1, //MAX ARGS
		["BAN_MEMBERS"], //REQUIRED PERMS
		false, //BOT OWNER ONLY
		false, //TRUSTED ONLY
		[], //BLACKLISTED USERS
		[], //WHITELISTED GUILDS
		false, //DELETE ON FINISH
		true, //SIMULATE TYPING
		500, //SPAM TIMEOUT
		["banuser", "banfromsite", "tempban", "permban"] //ALIASES
	);

	/**
	 * Constructs a new instance of the "Test"
	 * command class
	 * @param cmdConsole The interpreter's console instance
	 */
	constructor(cmdConsole:Console){
		//Call the superclass with the command fields
		super(Ban.commandFields, cmdConsole);
	}

	public async run(bot:Main, message:Discord.Message, args:string[], calledName:string):Promise<any> {
				let time;
				let userFound: any = await User.findOne({username: args[0]});
				if(!userFound) return message.channel.send(`:x: The username you provided was invalid!`);

				if(parseInt(args[args.length - 1])) time = parseInt(args[args.length - 1]);
				let reasonArr = args;
				reasonArr.splice(0, 1)
				console.log(reasonArr)
				if(time) reasonArr = reasonArr.slice(0, -1); 
				console.log(reasonArr)
				let reason
				if(reasonArr.length > 0) reason = reasonArr.join(" ");
				else reason = "TOS Violation";
				console.log(`Time: ${time} || Reason: ${reason} || Username: ${userFound.username}`);
				/* WIP
				if(time){
					let todayTimestamp = Date.now()
					
					let millisecondsToAdd = time * 24 * 60 * 60 * 1000

					let finalTime: number = todayTimestamp + millisecondsToAdd;
					console.log(`${time} || ${todayTimestamp} || ${millisecondsToAdd} || ${finalTime}`);

				}
				else {
					userFound.banned = true;
					userFound.save();

					return message.reply(`:white_check_mark: **${userFound.username}** has been permanently banned!`);
				}
				*/
		}
	}