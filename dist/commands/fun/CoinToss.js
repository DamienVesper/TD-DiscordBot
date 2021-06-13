"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import first-party classes
const Command_1 = __importDefault(require("../../modules/commandapi/Command"));
const CommandCategory_1 = require("../../modules/commandapi/CommandCategory");
const ICommandField_1 = require("../../modules/commandapi/ICommandField");
const MathUtil_1 = __importDefault(require("../../util/MathUtil"));
/**
 * Performs a random coin toss
 * @author Spotlightsrule
 */
class CoinToss extends Command_1.default {
    /**
     * Constructs a new instance of the "CoinToss"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(CoinToss.commandFields, cmdConsole);
    }
    async run(botClient, message, args, calledName) {
        // Assert the argument count
        super.assertArgCount(args.length, message);
        // Pick a random boolean and respond to the sender with either heads or tails
        await message.reply(`You tossed a coin and it landed on ${MathUtil_1.default.getRandomBool() ? `heads` : `tails`}.`);
        // End execution by resolving the promise
        return Promise.resolve(true);
    }
}
exports.default = CoinToss;
// Define the fields for the command
CoinToss.commandFields = new ICommandField_1.CommandField(`cointoss`, // NAME
`Performs a random coin toss`, // DESCRIPTION
`cointoss [none]`, // USAGE - [] = MANDATORY () = OPTIONAL
[`cointoss [none]`], // EXAMPLES
CommandCategory_1.CommandCategory.FUN, // CATEGORY
0, // MIN ARGS
0, // MAX ARGS
[], // REQUIRED PERMS
false, // BOT OWNER ONLY
false, // TRUSTED ONLY
[], // BLACKLISTED USERS
[], // WHITELISTED GUILDS
false, // DELETE ON FINISH
true, // SIMULATE TYPING
3000, // SPAM TIMEOUT
[`coin`, `coinflip`, `ct`, `flipcoin`, `coinroll`, `tosscoin`, `tc`] // ALIASES
);
//# sourceMappingURL=CoinToss.js.map