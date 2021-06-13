"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import first-party classes
const Command_1 = __importDefault(require("../../modules/commandapi/Command"));
const CommandCategory_1 = require("../../modules/commandapi/CommandCategory");
const ICommandField_1 = require("../../modules/commandapi/ICommandField");
const MathUtil_1 = __importDefault(require("../../util/MathUtil"));
const AsyncUtil_1 = __importDefault(require("../../util/AsyncUtil"));
// Import core Node modules and dependencies
const discord_js_1 = __importDefault(require("discord.js"));
class UserInfo extends Command_1.default {
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(UserInfo.commandFields, cmdConsole);
    }
    // Messy Code imported from a selfbot I made a while back. I only TSifyed it
    async run(bot, message, args, calledName) {
        super.assertArgCount(args.length, message);
        let userForInfo;
        if (args[0]) {
            if (await bot.fetchUser(args[0].replace(/[^\w\s]/gi, ``)))
                userForInfo = await bot.users.cache.get(args[0].replace(/[^\w\s]/gi, ``));
            else
                return message.reply(`:no_entry: The user ID you provided is invalid or the bot doesn't have that user cached!`);
        }
        else {
            userForInfo = message.author;
        }
        const sharedGuilds = [];
        let i = 0;
        await AsyncUtil_1.default.asyncForEach(await Array.from(bot.guilds.cache.values()), async (pulsarGuild) => {
            if (i > 10)
                return;
            const psGuild = await bot.guilds.cache.get(pulsarGuild.id);
            if (await psGuild.members.cache.get(userForInfo.id))
                sharedGuilds.push(`${psGuild.name} [${psGuild.id}]`);
            i++;
        });
        const user = userForInfo;
        const accountAgeMs = (Date.now() - user.createdTimestamp);
        const accountAge = await MathUtil_1.default.msToDHMS(accountAgeMs);
        const date = user.createdAt;
        const newDate = date.toLocaleDateString();
        let extraTag = ``;
        if (bot.owner == user.id)
            extraTag = `[BOT OWNER]`;
        const infoEmbed = new discord_js_1.default.MessageEmbed()
            .setAuthor(`User info - ${user.tag} ${extraTag || ``}`, message.author.displayAvatarURL())
            .setColor(`#000000`)
            .setThumbnail(user.displayAvatarURL())
            .addField(`User`, ` ${user} (${user.tag})`);
        if (user.id !== bot.user.id) {
            infoEmbed.addField(`Shared Guilds`, `${sharedGuilds.join(`, `) || `No Shared Guilds`}`);
        }
        infoEmbed.addField(`Account Age`, `${accountAge.day} days, ${accountAge.hours} hours, ${accountAge.minutes} minutes, and ${accountAge.seconds} seconds old`);
        infoEmbed.addField(`Account Creation Date`, `${newDate}`);
        if (message.guild && await message.guild.members.cache.get(user.id)) {
            const userMember = await message.guild.members.cache.get(user.id);
            const roleArray = [];
            userMember.roles.cache.forEach(async (role) => {
                if (role.name == `@everyone` || role.managed)
                    return;
                roleArray.push(`<@&${role.id}>`);
            });
            if (roleArray) {
                infoEmbed.addField(`Server Roles`, `${roleArray.join(`, `)}`);
            }
        }
        infoEmbed.setTimestamp();
        infoEmbed.setFooter(`User Lookup - ${user.id}`, bot.user.avatarURL());
        try {
            message.channel.send(infoEmbed);
        }
        catch (_a) {
            await message.channel.send(`:no_entry: Embeds are not supported in this channel!`);
        }
    }
}
exports.default = UserInfo;
// Define the fields for the command
UserInfo.commandFields = new ICommandField_1.CommandField(`uinfo`, // NAME
`Gets the information of a user`, // DESCRIPTION
`uinfo (userID)`, // USAGE - [] = MANDATORY () = OPTIONAL
[`uinfo 13267567124`, `uinfo`], // EXAMPLES
CommandCategory_1.CommandCategory.CORE, // CATEGORY
0, // MIN ARGS
1, // MAX ARGS
[], // REQUIRED PERMS
false, // BOT OWNER ONLY
true, // TRUSTED ONLY
[], // BLACKLISTED USERS
[], // WHITELISTED GUILDS
false, // DELETE ON FINISH
false, // SIMULATE TYPING
0, // SPAM TIMEOUT
[`userinfo`] // ALIASES
);
//# sourceMappingURL=UserInfo.js.map