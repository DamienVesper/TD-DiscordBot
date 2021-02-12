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
import Sticker from '../../modules/Models/Sticker'
import { userInfo } from "os";

export default class RemoveSticker extends Command {
	//Define the fields for the command
	private static commandFields = new CommandField(
		"removesticker", //NAME
		"Removes a sticker to the user", //DESCRIPTION
		"removesticker [stickername]", //USAGE - [] = MANDATORY () = OPTIONAL
		["removesticker based"], //EXAMPLES
		CommandCategory.ADMINISTRATION, //CATEGORY
		1, //MIN ARGS
		1, //MAX ARGS
		["MANAGE_MESSAGES"], //REQUIRED PERMS
		false, //BOT OWNER ONLY
		false, //TRUSTED ONLY
		[], //BLACKLISTED USERS
		[], //WHITELISTED GUILDS
		false, //DELETE ON FINISH
		true, //SIMULATE TYPING
		500, //SPAM TIMEOUT
		["deletesticker", "delsticker"] //ALIASES
	);

	/**
	 * Constructs a new instance of the "Test"
	 * command class
	 * @param cmdConsole The interpreter's console instance
	 */
	constructor(cmdConsole:Console){
		//Call the superclass with the command fields
		super(RemoveSticker.commandFields, cmdConsole);
	}

	public async run(bot:Main, message:Discord.Message, args:string[], calledName:string):Promise<any> {
		//Assert the argument count	
		super.assertArgCount(args.length , message);

		let stickerName1 = args[0];

		let result = false; 
			await Sticker.count({stickerName: stickerName1}, function (err, count){ 
			if(count>0){
				result = true;
			}
		}); 

		if(result){
			await Sticker.deleteOne({stickerName: stickerName1});
			return message.reply(`:white_check_mark: Removed sticker **${stickerName1}**`);
		}
		else {
			return message.reply(":x: No sticker exists with that name!");
		}
	}
}