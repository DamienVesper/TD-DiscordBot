"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import first-party classes
const Command_1 = __importDefault(require("../../modules/commandapi/Command"));
const CommandCategory_1 = require("../../modules/commandapi/CommandCategory");
const ICommandField_1 = require("../../modules/commandapi/ICommandField");
const User_1 = __importDefault(require("../../modules/Models/User"));
class FetchEmail extends Command_1.default {
    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(FetchEmail.commandFields, cmdConsole);
    }
    async run(bot, message, args, calledName) {
        // Assert the argument count
        super.assertArgCount(args.length, message);
        if (message.channel.id !== `794326024858763304`)
            return message.reply(`:x: This command can only be used in <#794326024858763304>`);
        const userFound = await User_1.default.findOne({ username: args[0] });
        if (!userFound)
            return message.channel.send(`:x: The username you provided was invalid!`);
        const email = userFound.email;
        message.reply(`:white_check_mark: The email address for user **${userFound.username}** is ||${userFound.email}||`);
    }
}
exports.default = FetchEmail;
// Define the fields for the command
FetchEmail.commandFields = new ICommandField_1.CommandField(`fetchemail`, // NAME
`Gets user email`, // DESCRIPTION
`fetchemail [stickername]`, // USAGE - [] = MANDATORY () = OPTIONAL
[`fetchemail sev`], // EXAMPLES
CommandCategory_1.CommandCategory.ADMINISTRATION, // CATEGORY
1, // MIN ARGS
1, // MAX ARGS
[`ADMINISTRATOR`], // REQUIRED PERMS
false, // BOT OWNER ONLY
false, // TRUSTED ONLY
[], // BLACKLISTED USERS
[], // WHITELISTED GUILDS
false, // DELETE ON FINISH
true, // SIMULATE TYPING
500, // SPAM TIMEOUT
[`getemail`] // ALIASES
);
//# sourceMappingURL=FetchEmail.js.map