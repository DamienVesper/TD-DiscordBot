"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PulsarGuild = void 0;
// Import core Node modules and dependencies
const discord_js_1 = __importDefault(require("discord.js"));
const Banlist_1 = __importDefault(require("./modules/Banlist"));
const index_1 = require("./index");
class PulsarGuild extends discord_js_1.default.Guild {
    constructor(discordGuild) {
        super(index_1.bot, null); // Leave Empty - Idk why but it works when it is empty
        this.id = discordGuild.id;
        this.banlist = new Banlist_1.default(discordGuild.id);
    }
    ban(member, options) {
        return this.members.ban(member, options);
    }
    unban(user, reason) {
        return this.members.unban(user, reason);
    }
}
exports.PulsarGuild = PulsarGuild;
class Main extends discord_js_1.default.Client {
    constructor(clientOptions) {
        // Call the superclass
        super(clientOptions);
        // Assign the class variables from the constructor's parameters
        this.config = require(`../config.json`);
        this.owner = this.config.botOwner;
        this.botAdmins = this.config.botAdmins;
        this.pulsarGuilds = new discord_js_1.default.Collection();
    }
    async fetchUser(userID) {
        const user = await this.users.fetch(userID) || null;
        if (user)
            return user;
        else
            return null;
    }
}
exports.default = Main;
//# sourceMappingURL=Main.js.map