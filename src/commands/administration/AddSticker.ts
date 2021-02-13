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

export default class AddSticker extends Command {
	//Define the fields for the command
	private static commandFields = new CommandField(
		"addsticker", //NAME
		"Adds a sticker to the user", //DESCRIPTION
		"addsticker [username] [stickername] [stickerURL]", //USAGE - [] = MANDATORY () = OPTIONAL
		["addsticker sev based https://imgur.com/fakeUrl.png"], //EXAMPLES
		CommandCategory.ADMINISTRATION, //CATEGORY
		3, //MIN ARGS
		3, //MAX ARGS
		["MANAGE_MESSAGES"], //REQUIRED PERMS
		false, //BOT OWNER ONLY
		false, //TRUSTED ONLY
		[], //BLACKLISTED USERS
		[], //WHITELISTED GUILDS
		false, //DELETE ON FINISH
		true, //SIMULATE TYPING
		500, //SPAM TIMEOUT
		["createsticker", "sticker"] //ALIASES
	);

	/**
	 * Constructs a new instance of the "Test"
	 * command class
	 * @param cmdConsole The interpreter's console instance
	 */
	constructor(cmdConsole:Console){
		//Call the superclass with the command fields
		super(AddSticker.commandFields, cmdConsole);
	}

	public async run(bot:Main, message:Discord.Message, args:string[], calledName:string):Promise<any> {
		//Assert the argument count	
		super.assertArgCount(args.length , message);

		let userFound: any = await User.findOne({username: args[0].toLowerCase()});
		if(!userFound) return message.channel.send(`:x: The username you provided was invalid!`);

		let stickerName1 = args[1];
		let stickerURL = args[2];

		let result = false; 

			await Sticker.count({stickerName: stickerName1}, function (err, count){ 
			if(count>0){
				result = true;
			}
		}); 

		if(!result){
			let newSticker = new Sticker({
				stickerName: stickerName1,
				ownerUsername: userFound.username,
				path: stickerURL,
				channelsBannedOn: []
			});
			console.log(stickerURL)
			newSticker.save()
			return message.reply(`:white_check_mark: Added unique sticker name **${stickerName1}** to User ${userFound.username} - URL: ${stickerURL}`);
		}
		else {
			return message.reply(":x: That sticker name is not unique! Please use a different sticker name!");
		}
	}
}