"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import first-party classes
const Command_1 = __importDefault(require("../../modules/commandapi/Command"));
const CommandCategory_1 = require("../../modules/commandapi/CommandCategory");
const ICommandField_1 = require("../../modules/commandapi/ICommandField");
// I yoinked the idea for this command from Kaimund600 lmfao
class MoveAll extends Command_1.default {
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(MoveAll.commandFields, cmdConsole);
    }
    async run(bot, message, args, calledName) {
        // Assert the argument count
        super.assertArgCount(args.length, message);
        if (!message.member.voice.channel) {
            return message.reply(`:no_entry: You must be in a voice channel to use this command!`);
        }
        const originalChannel = message.member.voice.channel;
        const channelToMoveTo = await message.guild.channels.cache.get(args[0].replace(/[^\w\s]/gi, ``));
        if (!channelToMoveTo) {
            return message.reply(`:no_entry: The value you provided was not a valid channel ID or I could not access that channel!`);
        }
        if (channelToMoveTo.type !== `voice`) {
            return message.reply(`:no_entry: The destination channel must be a voice channel!`);
        }
        const self = await message.guild.members.cache.get(bot.user.id);
        if (!self.hasPermission(`MOVE_MEMBERS`)) {
            return message.reply(`:warning: I do not have permission to move members!`);
        }
        originalChannel.members.forEach(member => {
            try {
                member.voice.setChannel(channelToMoveTo);
            }
            catch (_a) {
                null;
            }
        });
        message.channel.send(`:white_check_mark: Moved all users from ${originalChannel.name} to ${channelToMoveTo.name}!`);
    }
}
exports.default = MoveAll;
// Define the fields for the command
MoveAll.commandFields = new ICommandField_1.CommandField(`moveall`, // NAME
`Moves all the users from a voice channel you are in into a target voice channel ID!`, // DESCRIPTION
`moveall [targetID]`, // USAGE - [] = MANDATORY () = OPTIONAL
[`moveall [585572136895250481]`], // EXAMPLES
CommandCategory_1.CommandCategory.MODERATION, // CATEGORY
1, // MIN ARGS
1, // MAX ARGS
[`MOVE_MEMBERS`], // REQUIRED PERMS
false, // BOT OWNER ONLY
false, // TRUSTED ONLY
[], // BLACKLISTED USERS
[], // WHITELISTED GUILDS
false, // DELETE ON FINISH
true, // SIMULATE TYPING
5000, // SPAM TIMEOUT
[`switchchannel`, `movevc`] // ALIASES
);
//# sourceMappingURL=MoveAll.js.map