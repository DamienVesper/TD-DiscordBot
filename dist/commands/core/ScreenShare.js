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
const discord_js_1 = require("discord.js");
/**
 * Generates a Discord screenshare link
 * for the voice channel that the sender
 * is currently in
 * @author Spotlightsrule
 */
class ScreenShare extends Command_1.default {
    /**
     * Constructs a new instance of the "ScreenShare"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(ScreenShare.commandFields, cmdConsole);
    }
    async run(botClient, message, args, calledName) {
        // Assert the argument count
        super.assertArgCount(args.length, message);
        // Get the user who initiated the command
        const targetUser = (message.member);
        // Check if the sender is in a VC
        if (targetUser.voice.channelID != null) {
            // Get the ID of the server
            const serverID = (targetUser.guild.id);
            // Get the channel object of the VC that the the sender is in
            const vcObj = (targetUser.voice.channel);
            // Construct the screenshare link
            const ssLink = (`https://www.discordapp.com/channels/${serverID}/${vcObj.id}`);
            // Construct a MessageEmbed around the screenshare link
            const ssLinkEmbed = (new discord_js_1.MessageEmbed()
                .setAuthor(`Main Screenshare`, `${botClient.user.avatarURL()}`)
                .setColor(`#7289da`)
                .setTitle(`${ssLink}`)
                .setURL(`${ssLink}`)
                .setDescription(`:speaker: Voice Channel "${vcObj.name}" in guild "${targetUser.guild.name}"`)
                .addField(`Listeners`, `${vcObj.members.size}`, true)
                .addField(`Quality`, `${vcObj.bitrate.toString()}`, true)
                .setTimestamp()
                .setFooter(`Requested by: ${message.author.username}`, `${message.author.avatarURL()}`));
            // Reply with the link to the VC's screenshare in a MessageEmbed
            await (message.reply(ssLinkEmbed));
        }
        else {
            // Warn that the user isn't in a VC
            await (message.reply(`:x: This command can't be used because you are not in a VC.`));
        }
        // End execution by resolving the promise
        return Promise.resolve(true);
    }
}
exports.default = ScreenShare;
// Define the fields for the command
ScreenShare.commandFields = new ICommandField_1.CommandField(`screenshare`, // NAME
`Generates a Discord screenshare link for the voice channel that the sender is currently in`, // DESCRIPTION
`screenshare [none]`, // USAGE - [] = MANDATORY () = OPTIONAL
[`screenshare [none]`], // EXAMPLES
CommandCategory_1.CommandCategory.CORE, // CATEGORY
0, // MIN ARGS
0, // MAX ARGS
[], // REQUIRED PERMS
false, // BOT OWNER ONLY
false, // TRUSTED ONLY
[], // BLACKLISTED USERS
[], // WHITELISTED GUILDS
false, // DELETE ON FINISH
true, // SIMULATE TYPING
5000, // SPAM TIMEOUT
[`ss`, `sharescreen`] // ALIASES
);
//# sourceMappingURL=ScreenShare.js.map