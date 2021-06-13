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
class DisconnectAll extends Command_1.default {
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(DisconnectAll.commandFields, cmdConsole);
    }
    async run(bot, message, args, calledName) {
        // Assert the argument count
        super.assertArgCount(args.length, message);
        if (!message.member.voice.channel) {
            return message.reply(`:no_entry: You must be in a voice channel to use this command!`);
        }
        const originalChannel = message.member.voice.channel;
        const self = await message.guild.members.cache.get(bot.user.id);
        if (!self.hasPermission(`MOVE_MEMBERS`)) {
            return message.reply(`:warning: I do not have permission to disconnect members!`);
        }
        originalChannel.members.forEach(member => {
            try {
                member.voice.setChannel(null);
            }
            catch (_a) {
                null;
            }
        });
        message.channel.send(`:white_check_mark: Disconnected all users from ${originalChannel.name}!`);
    }
}
exports.default = DisconnectAll;
// Define the fields for the command
DisconnectAll.commandFields = new ICommandField_1.CommandField(`disconnectall`, // NAME
`Disconnects all the users from a voice channel you are in!`, // DESCRIPTION
`disconnectall [none]`, // USAGE - [] = MANDATORY () = OPTIONAL
[`disconnectall`], // EXAMPLES
CommandCategory_1.CommandCategory.MODERATION, // CATEGORY
0, // MIN ARGS
0, // MAX ARGS
[`MOVE_MEMBERS`], // REQUIRED PERMS
false, // BOT OWNER ONLY
false, // TRUSTED ONLY
[], // BLACKLISTED USERS
[], // WHITELISTED GUILDS
false, // DELETE ON FINISH
true, // SIMULATE TYPING
5000, // SPAM TIMEOUT
[`leaveall`, `disconnect`] // ALIASES
);
//# sourceMappingURL=DisconnectAll.js.map