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
class VerifyUserEmail extends Command_1.default {
    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(VerifyUserEmail.commandFields, cmdConsole);
    }
    async run(bot, message, args, calledName) {
        if (args[0].toLowerCase() !== `true` && args[0].toLowerCase() !== `false`)
            return message.reply(":x: Your first argument has to be \`true\` or \`false\`!");
        const userFound = await User_1.default.findOne({ username: args[1].toLowerCase() });
        if (!userFound)
            return message.channel.send(`:x: The username you provided was invalid!`);
        if (args[0].toLowerCase() == `true`) {
            userFound.verified = true;
            userFound.save();
        }
        else {
            userFound.verified = false;
            userFound.save();
        }
        return message.reply(`:white_check_mark: Updated email verification status of **${userFound.username}** to **${userFound.verified}**`);
    }
}
exports.default = VerifyUserEmail;
// Define the fields for the command
VerifyUserEmail.commandFields = new ICommandField_1.CommandField(`verifyuseremail`, // NAME
`Allows you toset a users email verification status`, // DESCRIPTION
`verifyuseremail [true/false] [username]`, // USAGE - [] = MANDATORY () = OPTIONAL
[`verifyuseremail true xsev`], // EXAMPLES
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
[`verifyemail`, `email`, `verify`] // ALIASES
);
//# sourceMappingURL=VerifyUserEmail.js.map