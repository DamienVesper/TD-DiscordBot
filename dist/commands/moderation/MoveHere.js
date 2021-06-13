"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import first-party classes
const Command_1 = __importDefault(require("../../modules/commandapi/Command"));
const CommandCategory_1 = require("../../modules/commandapi/CommandCategory");
const ICommandField_1 = require("../../modules/commandapi/ICommandField");
class MoveHere extends Command_1.default {
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(MoveHere.commandFields, cmdConsole);
    }
    async run(bot, message, args, calledName) {
        // Assert the argument count
        super.assertArgCount(args.length, message);
        if (!message.member.voice.channel) {
            return message.reply(`:no_entry: You must be in a voice channel to use this command!`);
        }
        const originalChannel = message.member.voice.channel;
        const userToMoveHere = await message.guild.members.cache.get(args[0].replace(/[^\w\s]/gi, ``));
        if (!userToMoveHere) {
            return message.reply(`:no_entry: The user you provided was invalid!`);
        }
        if (!userToMoveHere.voice.channel) {
            return message.reply(`:no_entry: That user is not inside a voice channel!`);
        }
        const self = await message.guild.members.cache.get(bot.user.id);
        if (!self.hasPermission(`MOVE_MEMBERS`)) {
            return message.reply(`:warning: I do not have permission to move members!`);
        }
        await userToMoveHere.voice.setChannel(originalChannel);
        message.channel.send(`:white_check_mark: Moved all user ${userToMoveHere.user.tag} from ${userToMoveHere.voice.channel.name} to ${originalChannel.name}!`);
    }
}
exports.default = MoveHere;
// Define the fields for the command
MoveHere.commandFields = new ICommandField_1.CommandField(`movehere`, // NAME
`Moves a user from a voice channel into the voice channel you are inside.`, // DESCRIPTION
`moveahere [@user/userID]`, // USAGE - [] = MANDATORY () = OPTIONAL
[`movehere [362938646304653312]`], // EXAMPLES
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
[] // ALIASES
);
//# sourceMappingURL=MoveHere.js.map