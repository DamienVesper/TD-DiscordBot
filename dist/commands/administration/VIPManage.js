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
class VIPManage extends Command_1.default {
    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(VIPManage.commandFields, cmdConsole);
    }
    async run(bot, message, args, calledName) {
        if (args[0].toLowerCase() !== `give` && args[0].toLowerCase() !== `take`)
            return message.reply(":x: Your first argument has to be \`give\` or \`take\`!");
        const userFound = await User_1.default.findOne({ username: args[1].toLowerCase() });
        if (!userFound)
            return message.channel.send(`:x: The username you provided was invalid or does not exist!`);
        if (args[0].toLowerCase() == `give`) {
            userFound.perms.vip = true;
            userFound.save();
        }
        else {
            userFound.perms.vip = false;
            userFound.save();
        }
        return message.reply(`:white_check_mark: Updated VIP status of **${userFound.username}** to **${userFound.perms.vip}**`);
    }
}
exports.default = VIPManage;
// Define the fields for the command
VIPManage.commandFields = new ICommandField_1.CommandField(`vipmanage`, // NAME
`Allows you to give or take VIP to a user`, // DESCRIPTION
`vipmanage [give/take] [username]`, // USAGE - [] = MANDATORY () = OPTIONAL
[`vipmanage give xsev`], // EXAMPLES
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
[`premiummanage`, `givevip`, `takevip`, `vip`] // ALIASES
);
//# sourceMappingURL=VIPManage.js.map