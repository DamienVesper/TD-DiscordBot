// Import core Node modules and dependencies
import Discord, { ClientOptions } from "discord.js";
import Banlist from './modules/Banlist';
import mongoose from 'mongoose';

import { bot } from './index';

export class PulsarGuild extends Discord.Guild {
	banlist: Banlist;

	ban (member, options?: Discord.BanOptions) {
	    return this.members.ban(member, options);
	  }

	unban (user: Discord.UserResolvable, reason?: string) {
	    return this.members.unban(user, reason);
	  }

	  constructor (discordGuild: Discord.Guild) {
	    super(bot, null); // Leave Empty - Idk why but it works when it is empty

	    this.id = discordGuild.id;
	    this.banlist = new Banlist(discordGuild.id);
	}
}

export default class Main extends Discord.Client {
    config:any;
    owner: string
    botAdmins: string[]
	pulsarGuilds: Discord.Collection<string, PulsarGuild>

	constructor (clientOptions?:ClientOptions) {
	    // Call the superclass
	    super(clientOptions);

	    // Assign the class variables from the constructor's parameters
	    this.config = require(`../config.json`);
	    this.owner = this.config.botOwner;
	    this.botAdmins = this.config.botAdmins;
	    this.pulsarGuilds = new Discord.Collection();
	}

	async fetchUser (userID: string): Promise<Discord.User> {
	    const user = await this.users.fetch(userID) || null;
	    if (user) return user;
	    else return null;
	}
}
