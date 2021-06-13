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
class AddRemoveMod extends Command_1.default {
    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(AddRemoveMod.commandFields, cmdConsole);
    }
    async run(bot, message, args, calledName) {
        const firstUser = await User_1.default.findOne({ username: args[0] });
        if (!firstUser)
            return message.channel.send(`:x: The username you provided was invalid!`);
        async function asyncForEach(array, callback) {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }
        async function removeElement(array, elementToRemove) {
            let i = 0;
            const emptyArr = [];
            await asyncForEach(array, item => {
                if (elementToRemove === item)
                    emptyArr.push(i);
                i++;
            });
            await asyncForEach(emptyArr, item => {
                if (item > -1) {
                    array.splice(item, 1);
                }
            });
        }
        const userFound = await User_1.default.findOne({ username: args[1] });
        if (!userFound)
            return message.channel.send(`:x: The username you provided was invalid!`);
        if (firstUser.channel.moderators.includes(userFound.username)) {
            firstUser.channel.moderators = await removeElement(firstUser.channel.moderators, userFound.username);
            firstUser.save();
            return message.reply(`:white_check_mark: Removed moderator ranking to **${userFound.username}** for channel **${firstUser.username}**`);
        }
        else {
            firstUser.channel.moderators.push(userFound.username);
            firstUser.save();
            return message.reply(`:white_check_mark: Gave moderator ranking to **${userFound.username}** for channel **${firstUser.username}**`);
        }
    }
}
exports.default = AddRemoveMod;
// Define the fields for the command
AddRemoveMod.commandFields = new ICommandField_1.CommandField(`togglemod`, // NAME
`Allows you to add or remove a moderator from a streamers stream`, // DESCRIPTION
`togglemod [streamer] [moderatortoadd/moderatortoremove]`, // USAGE - [] = MANDATORY () = OPTIONAL
[`togglemod give xsev`], // EXAMPLES
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
[`mod`, `givemod`, `takemod`, `addremovemod`] // ALIASES
);
//# sourceMappingURL=AddRemoveMod.js.map