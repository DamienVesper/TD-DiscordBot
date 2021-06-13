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
class ResetStreamKey extends Command_1.default {
    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(ResetStreamKey.commandFields, cmdConsole);
    }
    async run(bot, message, args, calledName) {
        const userFound = await User_1.default.findOne({ username: args[0].toLowerCase() });
        if (!userFound)
            return message.channel.send(`:x: The username you provided was invalid!`);
        function makeid(length) {
            let result = ``;
            const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
        const newstreamKey = await makeid(32);
        userFound.settings.streamKey = newstreamKey;
        userFound.save();
        return message.reply(`:white_check_mark: Reset the stream key of **${args[0]}**`);
    }
}
exports.default = ResetStreamKey;
// Define the fields for the command
ResetStreamKey.commandFields = new ICommandField_1.CommandField(`resetstreamkey`, // NAME
`Resets a users stream key`, // DESCRIPTION
`resetstreamkey [username]`, // USAGE - [] = MANDATORY () = OPTIONAL
[`resetstreamkey xsev`], // EXAMPLES
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
[`streamkey`, `regenstreamkey`] // ALIASES
);
//# sourceMappingURL=ResetStreamKey.js.map