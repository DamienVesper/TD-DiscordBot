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

export default class Resetallkeys extends Command {
	//Define the fields for the command
	private static commandFields = new CommandField(
		"resetallkeys", //NAME
		"Resets all keys", //DESCRIPTION
		"resetallkeys", //USAGE - [] = MANDATORY () = OPTIONAL
		["resetallkeys"], //EXAMPLES
		CommandCategory.ADMINISTRATION, //CATEGORY
		0, //MIN ARGS
		0, //MAX ARGS
		["ADMINISTRATOR"], //REQUIRED PERMS
		false, //BOT OWNER ONLY
		false, //TRUSTED ONLY
		[], //BLACKLISTED USERS
		[], //WHITELISTED GUILDS
		false, //DELETE ON FINISH
		true, //SIMULATE TYPING
		500, //SPAM TIMEOUT
		["allkeys", "regenallkeys"] //ALIASES
	);

	/**
	 * Constructs a new instance of the "Test"
	 * command class
	 * @param cmdConsole The interpreter's console instance
	 */
	constructor(cmdConsole:Console){
		//Call the superclass with the command fields
		super(Resetallkeys.commandFields, cmdConsole);
	}

	public async run(bot:Main, message:Discord.Message, args:string[], calledName:string):Promise<any> {
			function makeid(length) {
				var result           = '';
				var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
				var charactersLength = characters.length;
				for ( var i = 0; i < length; i++ ) {
				   result += characters.charAt(Math.floor(Math.random() * charactersLength));
				}
				return result;
			 }

			 let newallkeys = await makeid(32)

			 let newMessage = await message.channel.send(":hourglass: Please wait...");

				
				
			let collection = await User.collection;
		    let bulkOp = await User.collection.initializeOrderedBulkOp();
				
				
			var count = 0
	
			collection.find().forEach(async function(doc) {
				await bulkOp.find({ '_id': doc._id }).updateOne({
						'$set': { 
							chat_key: makeid(64),
							stream_key: makeid(32)
						}
					}
					);
					let total = User.collection.length;

					if(total % count == 0){
						newMessage.edit(`:hourglass: Reset keys of ${count}/${total}`)
					} 
					count++;
				}).then(async function (){
					await bulkOp.execute().then(async result => {
						let demoUser: any = await User.findOne({username: "demo"});
						demoUser.chat_key = "demo";
						demoUser.save();
						console.log("Updated Demo User!");
						return newMessage.edit(`:white_check_mark: Reset all stream and chat keys!`);
					});
			});
		}
	}