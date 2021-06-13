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
class DeleteAccount extends Command_1.default {
    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(DeleteAccount.commandFields, cmdConsole);
    }
    async run(bot, message, args, calledName) {
        const userFound = await User_1.default.findOne({ username: args[0].toLowerCase() });
        if (!userFound)
            return message.channel.send(`:x: The username you provided was invalid!`);
        await User_1.default.deleteOne({ username: args[0].toLowerCase() });
        return message.reply(`:white_check_mark: Deleted the account of **${userFound.username}**`);
    }
}
exports.default = DeleteAccount;
// Define the fields for the command
DeleteAccount.commandFields = new ICommandField_1.CommandField(`deleteaccount`, // NAME
`Allows you to delete a user account`, // DESCRIPTION
`deleteaccount [username]`, // USAGE - [] = MANDATORY () = OPTIONAL
[`deleteaccount xsev`], // EXAMPLES
CommandCategory_1.CommandCategory.ADMINISTRATION, // CATEGORY
2, // MIN ARGS
2, // MAX ARGS
[`ADMINISTRATOR`], // REQUIRED PERMS
false, // BOT OWNER ONLY
false, // TRUSTED ONLY
[], // BLACKLISTED USERS
[], // WHITELISTED GUILDS
false, // DELETE ON FINISH
true, // SIMULATE TYPING
500, // SPAM TIMEOUT
[`wipe`] // ALIASES
);
//# sourceMappingURL=DeleteAccount.js.map