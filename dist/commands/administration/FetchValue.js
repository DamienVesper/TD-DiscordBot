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
class FetchValue extends Command_1.default {
    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(FetchValue.commandFields, cmdConsole);
    }
    async run(bot, message, args, calledName) {
        if (message.channel.id !== `794326024858763304`)
            return message.reply(`:x: This command can only be used in <#794326024858763304>`);
        const userFound = await User_1.default.findOne({ username: args[0] });
        if (!userFound)
            return message.channel.send(`:x: The username you provided was invalid!`);
        const bannedValues = [`password`];
        if (bannedValues.includes(args[1].toLowerCase()))
            return message.reply(`:x: You cannot request this data value!`);
        else
            return message.reply(`:information_source: Value **${args[1]}** of user **${userFound.username}** is **${userFound[`${args[1]}`]}**`);
    }
}
exports.default = FetchValue;
// Define the fields for the command
FetchValue.commandFields = new ICommandField_1.CommandField(`fetchvalue`, // NAME
`Allows you to fetch a data value from a user`, // DESCRIPTION
`fetchvalue [username] [data value]`, // USAGE - [] = MANDATORY () = OPTIONAL
[`fetchvalue xsev isStaff`], // EXAMPLES
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
[`fetchdata`, `data`] // ALIASES
);
//# sourceMappingURL=FetchValue.js.map