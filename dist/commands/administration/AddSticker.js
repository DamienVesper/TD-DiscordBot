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
const Sticker_1 = __importDefault(require("../../modules/Models/Sticker"));
class AddSticker extends Command_1.default {
    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(AddSticker.commandFields, cmdConsole);
    }
    async run(bot, message, args, calledName) {
        // Assert the argument count
        super.assertArgCount(args.length, message);
        const userFound = await User_1.default.findOne({ username: args[0].toLowerCase() });
        if (!userFound)
            return message.channel.send(`:x: The username you provided was invalid!`);
        const stickerName1 = args[1];
        const stickerURL = args[2];
        let result = false;
        await Sticker_1.default.count({ stickerName: stickerName1 }, (err, count) => {
            if (err)
                return err;
            if (count > 0) {
                result = true;
            }
        });
        if (!result) {
            const newSticker = new Sticker_1.default({
                stickerName: stickerName1,
                ownerUsername: userFound.username,
                path: stickerURL,
                channelsBannedOn: []
            });
            newSticker.save();
            return message.reply(`:white_check_mark: Added unique sticker name **${stickerName1}** to User ${userFound.username} - URL: ${stickerURL}`);
        }
        else {
            return message.reply(`:x: That sticker name is not unique! Please use a different sticker name!`);
        }
    }
}
exports.default = AddSticker;
// Define the fields for the command
AddSticker.commandFields = new ICommandField_1.CommandField(`addsticker`, // NAME
`Adds a sticker to the user`, // DESCRIPTION
`addsticker [username] [stickername] [stickerURL]`, // USAGE - [] = MANDATORY () = OPTIONAL
[`addsticker sev based https://imgur.com/fakeUrl.png`], // EXAMPLES
CommandCategory_1.CommandCategory.ADMINISTRATION, // CATEGORY
3, // MIN ARGS
3, // MAX ARGS
[`MANAGE_MESSAGES`], // REQUIRED PERMS
false, // BOT OWNER ONLY
false, // TRUSTED ONLY
[], // BLACKLISTED USERS
[], // WHITELISTED GUILDS
false, // DELETE ON FINISH
true, // SIMULATE TYPING
500, // SPAM TIMEOUT
[`createsticker`, `sticker`] // ALIASES
);
//# sourceMappingURL=AddSticker.js.map