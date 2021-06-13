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
class StaffManage extends Command_1.default {
    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(StaffManage.commandFields, cmdConsole);
    }
    async run(bot, message, args, calledName) {
        if (args[0].toLowerCase() !== `give` && args[0].toLowerCase() !== `take`)
            return message.reply(`:x: Your first argument has to be \`give\` or \`take\`!`);
        const userFound = await User_1.default.findOne({ username: args[1].toLowerCase() });
        if (!userFound)
            return message.channel.send(`:x: The username you provided was invalid or does not exist!`);
        if (args[0].toLowerCase() === `give`) {
            userFound.perms.staff = true;
            userFound.save();
        }
        else {
            userFound.perms.staff = false;
            userFound.save();
        }
        return message.reply(`:white_check_mark: Updated Staff status of **${userFound.username}** to **${userFound.perms.staff}**`);
    }
}
exports.default = StaffManage;
// Define the fields for the command
StaffManage.commandFields = new ICommandField_1.CommandField(`staffmanage`, // NAME
`Allows you to give or take Staff Rank to a user`, // DESCRIPTION
`staffmanage [give/take] [username]`, // USAGE - [] = MANDATORY () = OPTIONAL
[`staffmanage give xsev`], // EXAMPLES
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
[`givestaff`, `staff`] // ALIASES
);
//# sourceMappingURL=StaffManage.js.map