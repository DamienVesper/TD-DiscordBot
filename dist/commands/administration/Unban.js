"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import first-party classes
const Command_1 = __importDefault(require("../../modules/commandapi/Command"));
const CommandCategory_1 = require("../../modules/commandapi/CommandCategory");
const ICommandField_1 = require("../../modules/commandapi/ICommandField");
// Import core Node modules and dependencies
const discord_js_1 = __importDefault(require("discord.js"));
const fs_1 = __importDefault(require("fs"));
const User_1 = __importDefault(require("../../modules/Models/User"));
class Ban extends Command_1.default {
    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(Ban.commandFields, cmdConsole);
    }
    async run(bot, message, args, calledName) {
        const userFound = await User_1.default.findOne({ username: args[0].toLowerCase() });
        if (!userFound)
            return message.channel.send(`:x: The username you provided was invalid!`);
        const banTimers = JSON.parse(fs_1.default.readFileSync(`./data/banTimers.json`).toString());
        if (banTimers[`${userFound.username}`])
            delete banTimers[`${userFound.username}`];
        await fs_1.default.writeFileSync(`./data/banTimers.json`, JSON.stringify(banTimers, null, 4));
        if (!userFound.isSuspended)
            return message.reply(`:x: That user is not banned.`);
        message.reply(`:white_check_mark: **${userFound.username}** has been unbanned!`);
        userFound.isSuspended = false;
        userFound.save();
        const reportEmbed = new discord_js_1.default.MessageEmbed()
            .setAuthor(`Unban`, message.author.displayAvatarURL())
            .setThumbnail(userFound.avatar_url)
            .setColor(`#00db04`)
            .addField(`User`, `[${userFound.username}](https://throwdown.tv/${userFound.username})`)
            .addField(`Moderator`, `<@${message.author.id}> (${message.author.tag})`)
            .setTimestamp()
            .setFooter(`throwdown.tv`, message.guild.iconURL());
        (await bot.channels.cache.get(`794268909251330120`)).send(reportEmbed);
    }
}
exports.default = Ban;
// Define the fields for the command
Ban.commandFields = new ICommandField_1.CommandField(`unban`, // NAME
`unbans a user from the site`, // DESCRIPTION
`unban [username]`, // USAGE - [] = MANDATORY () = OPTIONAL
[`unban xsev`], // EXAMPLES
CommandCategory_1.CommandCategory.ADMINISTRATION, // CATEGORY
1, // MIN ARGS
1, // MAX ARGS
[`BAN_MEMBERS`], // REQUIRED PERMS
false, // BOT OWNER ONLY
false, // TRUSTED ONLY
[], // BLACKLISTED USERS
[], // WHITELISTED GUILDS
false, // DELETE ON FINISH
true, // SIMULATE TYPING
500, // SPAM TIMEOUT
[`unbanuser`] // ALIASES
);
//# sourceMappingURL=Unban.js.map