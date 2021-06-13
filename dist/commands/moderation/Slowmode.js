"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import first-party classes
const Command_1 = __importDefault(require("../../modules/commandapi/Command"));
const CommandCategory_1 = require("../../modules/commandapi/CommandCategory");
const ICommandField_1 = require("../../modules/commandapi/ICommandField");
class Slowmode extends Command_1.default {
    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(Slowmode.commandFields, cmdConsole);
    }
    async run(bot, message, args, calledName) {
        // Assert the argument count
        super.assertArgCount(args.length, message);
        const self = await message.guild.members.cache.get(bot.user.id);
        if (!self.hasPermission(`MANAGE_CHANNELS`))
            return message.reply(`:x: I do not have the \`MANAGE_CHANNELS\` permission so I cannot set a slowmode timer in this channel!`);
        if (!parseInt(args[0]) && parseInt(args[0]) !== 0) {
            return message.reply(`:x: ${bot.config.prefix}${Slowmode.commandFields.usage}`);
        }
        const secondsToSlowmodeFor = Math.floor(parseInt(args[0]));
        if (secondsToSlowmodeFor > 120) {
            return message.reply(`:no_entry: The highest slowmode timer you can set is 120 seconds!`);
        }
        const channel = message.channel;
        await channel.setRateLimitPerUser(secondsToSlowmodeFor, `Slowmode set by ${message.author.tag} [${message.author.id}]`);
        return message.channel.send(`:white_check_mark: Slowmode timer set for ${secondsToSlowmodeFor} seconds!`);
    }
}
exports.default = Slowmode;
// Define the fields for the command
Slowmode.commandFields = new ICommandField_1.CommandField(`slowmode`, // NAME
`Adds a slowmode timer into the channel the command message was sent in`, // DESCRIPTION
`slowmode [timeInSeconds]`, // USAGE - [] = MANDATORY () = OPTIONAL
[`slowmode [4]`, `slowmode [0]`], // EXAMPLES
CommandCategory_1.CommandCategory.MODERATION, // CATEGORY
1, // MIN ARGS
-1, // MAX ARGS
[`MANAGE_MESSAGES`], // REQUIRED PERMS
false, // BOT OWNER ONLY
false, // TRUSTED ONLY
[], // BLACKLISTED USERS
[], // WHITELISTED GUILDS
true, // DELETE ON FINISH
true, // SIMULATE TYPING
0, // SPAM TIMEOUT
[`antispam`, `messagetimelimit`] // ALIASES
);
//# sourceMappingURL=Slowmode.js.map