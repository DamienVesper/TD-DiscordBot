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
        let time;
        const userFound = await User_1.default.findOne({ username: args[0].toLowerCase() });
        if (!userFound)
            return message.channel.send(`:x: The username you provided was invalid!`);
        if (parseInt(args[args.length - 1]))
            time = parseInt(args[args.length - 1]);
        let reasonArr = args;
        reasonArr.splice(0, 1);
        console.log(reasonArr);
        if (time)
            reasonArr = reasonArr.slice(0, -1);
        console.log(reasonArr);
        let reason;
        if (reasonArr.length > 0)
            reason = reasonArr.join(` `);
        else
            reason = `TOS Violation`;
        if (time) {
            const todayTimestamp = Date.now();
            const millisecondsToAdd = time * 24 * 60 * 60 * 1000;
            const finalTime = todayTimestamp + millisecondsToAdd;
            const banTimers = JSON.parse(fs_1.default.readFileSync(`./data/banTimers.json`).toString());
            banTimers[`${userFound.username}`] = finalTime;
            console.log(banTimers);
            await fs_1.default.writeFileSync(`./data/banTimers.json`, JSON.stringify(banTimers, null, 4));
            message.reply(`:white_check_mark: **${userFound.username}** has been banned for **${time}** days!`);
        }
        else {
            const banTimers = JSON.parse(fs_1.default.readFileSync(`./data/banTimers.json`).toString());
            if (banTimers[`${userFound.username}`])
                delete banTimers[`${userFound.username}`];
            await fs_1.default.writeFileSync(`./data/banTimers.json`, JSON.stringify(banTimers, null, 4));
            message.reply(`:white_check_mark: **${userFound.username}** has been permanently banned!`);
        }
        userFound.isSuspended = true;
        userFound.live = false;
        userFound.save();
        const reportEmbed = new discord_js_1.default.MessageEmbed()
            .setAuthor(`Ban`, message.author.displayAvatarURL())
            .setThumbnail(userFound.avatar_url)
            .setColor(`#800000`)
            .addField(`User`, `[${userFound.username}](https://throwdown.tv/${userFound.username})`)
            .addField(`Moderator`, `<@${message.author.id}> (${message.author.tag})`)
            .setTimestamp()
            .setFooter(`throwdown.tv`, message.guild.iconURL());
        if (time)
            reportEmbed.addField(`Time`, `${time} Days`);
        if (!time)
            reportEmbed.addField(`Time`, `Infinite`);
        if (reason)
            reportEmbed.addField(`Reason`, reason);
        (await bot.channels.cache.get(`794268909251330120`)).send(reportEmbed);
    }
}
exports.default = Ban;
// Define the fields for the command
Ban.commandFields = new ICommandField_1.CommandField(`ban`, // NAME
`Bans a user from the site`, // DESCRIPTION
`ban [username] [reason] (time in days)`, // USAGE - [] = MANDATORY () = OPTIONAL
[`ban basedradio 2h`], // EXAMPLES
CommandCategory_1.CommandCategory.ADMINISTRATION, // CATEGORY
2, // MIN ARGS
-1, // MAX ARGS
[`BAN_MEMBERS`], // REQUIRED PERMS
false, // BOT OWNER ONLY
false, // TRUSTED ONLY
[], // BLACKLISTED USERS
[], // WHITELISTED GUILDS
false, // DELETE ON FINISH
true, // SIMULATE TYPING
500, // SPAM TIMEOUT
[`banuser`, `banfromsite`, `tempban`, `permban`] // ALIASES
);
//# sourceMappingURL=Ban.js.map