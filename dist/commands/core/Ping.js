"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import first-party classes
const Command_1 = __importDefault(require("../../modules/commandapi/Command"));
const CommandCategory_1 = require("../../modules/commandapi/CommandCategory");
const ICommandField_1 = require("../../modules/commandapi/ICommandField");
class Ping extends Command_1.default {
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(Ping.commandFields, cmdConsole);
    }
    async run(bot, message, args, calledName) {
        // Assert the argument count
        super.assertArgCount(args.length, message);
        const m = await message.channel.send(`:hourglass: Please wait...`);
        const timeInBetween = m.createdTimestamp - message.createdTimestamp;
        return m.edit(`:information_source: Main Command API Latency is ${timeInBetween} MS.`);
    }
}
exports.default = Ping;
// Define the fields for the command
Ping.commandFields = new ICommandField_1.CommandField(`ping`, // NAME
`Pong!`, // DESCRIPTION
`ping [none]`, // USAGE - [] = MANDATORY () = OPTIONAL
[`ping [none]`], // EXAMPLES
CommandCategory_1.CommandCategory.CORE, // CATEGORY
0, // MIN ARGS
0, // MAX ARGS
[], // REQUIRED PERMS
false, // BOT OWNER ONLY
false, // TRUSTED ONLY
[], // BLACKLISTED USERS
[], // WHITELISTED GUILDS
false, // DELETE ON FINISH
true, // SIMULATE TYPING
5000, // SPAM TIMEOUT
[] // ALIASES
);
//# sourceMappingURL=Ping.js.map