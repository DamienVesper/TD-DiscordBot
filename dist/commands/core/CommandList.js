"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import first-party classes
const Command_1 = __importDefault(require("../../modules/commandapi/Command"));
const CommandCategory_1 = require("../../modules/commandapi/CommandCategory");
const ICommandField_1 = require("../../modules/commandapi/ICommandField");
/**
 * Prints a list of all the valid
 * commands that the bot can accept
 * @author Spotlightsrule
 */
class CommandList extends Command_1.default {
    /**
     * Constructs a new instance of the "CommandList"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor(cmdConsole, cmdInterpreter) {
        // Call the superclass with the command fields
        super(CommandList.commandFields, cmdConsole);
        // Assign the class variables from the constructor's parameters
        this.cmdInterpreter = cmdInterpreter;
    }
    async run(botClient, message, args, calledName) {
        // Assert the argument count
        super.assertArgCount(args.length, message);
        // Check if the sender sent an option to view a specific category of command
        if (args.length >= 1) {
            // Check if the input category matches a valid category
            if ((args[0].toUpperCase()) in CommandCategory_1.CommandCategory) {
                // Derive the command category object via reflection
                const validCat = Reflect.get(CommandCategory_1.CommandCategory, args[0].toUpperCase());
                // Reply with only the commands in that category
                await message.reply(`Commands in the category "${CommandCategory_1.CommandCategory[validCat].toLowerCase()}": \`${this.cmdInterpreter.getRegisteredCommandList(validCat)}\``);
            }
            else {
                // Warn that an invalid category was passed and suggest the valid options
                await message.reply(`Sorry, but "${args[0].toLowerCase()}" is not a valid command category. The available categories are: \`${CommandCategory_1.CommandCategory.values()}\`.`);
            }
        }
        else {
            // Send the full command list
            await message.reply(`Full command list: \`${this.cmdInterpreter.getRegisteredCommandList()}\``);
        }
        // End execution by resolving the promise
        return Promise.resolve(true);
    }
}
exports.default = CommandList;
// Define the fields for the command
CommandList.commandFields = new ICommandField_1.CommandField(`commandlist`, // NAME
`Prints a list of all the valid commands that the bot can accept`, // DESCRIPTION
`commandist (category)`, // USAGE - [] = MANDATORY () = OPTIONAL
[`commandlist [none]`, `commandlist moderation`], // EXAMPLES
CommandCategory_1.CommandCategory.CORE, // CATEGORY
0, // MIN ARGS
1, // MAX ARGS
[], // REQUIRED PERMS
false, // BOT OWNER ONLY
false, // TRUSTED ONLY
[], // BLACKLISTED USERS
[], // WHITELISTED GUILDS
false, // DELETE ON FINISH
true, // SIMULATE TYPING
3000, // SPAM TIMEOUT
[`allcommands`, `list`, `commands`] // ALIASES
);
//# sourceMappingURL=CommandList.js.map