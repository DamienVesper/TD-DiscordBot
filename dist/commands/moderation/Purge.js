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
class Purge extends Command_1.default {
    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(Purge.commandFields, cmdConsole);
    }
    async run(bot, message, args, calledName) {
        // Assert the argument count
        super.assertArgCount(args.length, message);
        // Check if the message type is direct
        if (message.channel.type !== `text`)
            return message.author.send(`:warning: This command may only be used on a server.`);
        const botMember = await message.guild.members.cache.get(bot.user.id);
        if (!botMember.hasPermission(`MANAGE_MESSAGES`)) {
            return message.reply(`:no_entry: I do not have permission to delete messages!`);
        }
        const m = await message.channel.send(`:hourglass: One moment, please... `);
        // No arguments
        if (!args[0])
            return m.edit(`:information_source: The correct usage is: ${bot.config.prefix}${Purge.commandFields.usage}`);
        let memberToPurge;
        let purgeFromMember = false;
        if (args[1]) {
            // Find Member
            if (message.mentions.users.first())
                memberToPurge = await message.guild.members.cache.get(message.mentions.users.first().id);
            else
                memberToPurge = await message.guild.members.cache.get(args[1].replace(/[^\w\s]/gi, ``));
            await memberToPurge;
            // Member Not Found
            if (!memberToPurge)
                return m.edit(`:no_entry: Couldn't find the member to purge messages from!`);
            else
                purgeFromMember = true;
        }
        if (!parseInt(args[0]) || parseInt(args[0]) > 500 || parseInt(args[0]) < 2) {
            return m.edit(`:no_entry: The amount of messages to purge has to be lower than 500 and greater than 2!`);
        }
        m.delete();
        const numToPurge = parseInt(args[0]);
        let messagesInChannel = await message.channel.messages.fetch({ limit: numToPurge + 1 });
        if (purgeFromMember) {
            messagesInChannel = await messagesInChannel.filter(m => m.author.id == memberToPurge.id);
        }
        const numOfMessagesFinal = messagesInChannel.size;
        // Actually delete the messages
        messagesInChannel.forEach(async (msg) => {
            try {
                await msg.delete();
            }
            catch (_a) {
                null;
            }
        });
        const psGuild = await bot.pulsarGuilds.get(message.guild.id);
        const actionChannel = await bot.channels.cache.get(bot.config.homeGuild.homeGuildActionChannel);
        const chan = message.channel;
        const reportEmbed = new discord_js_1.default.MessageEmbed()
            .setAuthor(`Purge`, message.author.displayAvatarURL())
            .setThumbnail(message.author.displayAvatarURL())
            .setColor(`#ff7f00`);
        if (memberToPurge && purgeFromMember) {
            reportEmbed.addField(`User To Purge From`, `<@${memberToPurge.id}> (${memberToPurge.user.tag}) [${memberToPurge.id}]`);
        }
        reportEmbed.addField(`Moderator`, `<@${message.author.id}> (${message.author.tag})`);
        reportEmbed.addField(`Channel`, `<#${message.channel.id}> (#${chan.name}) [${message.channel.id}]`);
        reportEmbed.addField(`Number Of Messages`, `Deleted ${parseInt(args[0])} messages!`);
        reportEmbed.setTimestamp();
        reportEmbed.setFooter(`ID: ${message.author.id}`);
        await actionChannel.send(reportEmbed);
        return message.reply(`:white_check_mark: Deleted ${parseInt(args[0])} messages!`);
    }
}
exports.default = Purge;
// Define the fields for the command
Purge.commandFields = new ICommandField_1.CommandField(`purge`, // NAME
`Remove a massive amount of messages from a channel`, // DESCRIPTION
`purge [number of messages] (@member/userID)`, // USAGE - [] = MANDATORY () = OPTIONAL
[`purge [100] (@severepain#0001)`, `purge [20]`], // EXAMPLES
CommandCategory_1.CommandCategory.MODERATION, // CATEGORY
1, // MIN ARGS
2, // MAX ARGS
[`MANAGE_MESSAGES`], // REQUIRED PERMS
false, // BOT OWNER ONLY
false, // TRUSTED ONLY
[], // BLACKLISTED USERS
[], // WHITELISTED GUILDS
true, // DELETE ON FINISH
true, // SIMULATE TYPING
5000, // SPAM TIMEOUT
[`p`, `prune`, `delm`] // ALIASES
);
//# sourceMappingURL=Purge.js.map