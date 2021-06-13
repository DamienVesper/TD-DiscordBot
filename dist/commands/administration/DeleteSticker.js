"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import first-party classes
const Command_1 = __importDefault(require("../../modules/commandapi/Command"));
const CommandCategory_1 = require("../../modules/commandapi/CommandCategory");
const ICommandField_1 = require("../../modules/commandapi/ICommandField");
const Sticker_1 = __importDefault(require("../../modules/Models/Sticker"));
class RemoveSticker extends Command_1.default {
    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(RemoveSticker.commandFields, cmdConsole);
    }
    async run(bot, message, args, calledName) {
        // Assert the argument count
        super.assertArgCount(args.length, message);
        const stickerName1 = args[0];
        let result = false;
        await Sticker_1.default.count({ stickerName: stickerName1 }, (err, count) => {
            if (count > 0) {
                result = true;
            }
        });
        if (result) {
            await Sticker_1.default.deleteOne({ stickerName: stickerName1 });
            return message.reply(`:white_check_mark: Removed sticker **${stickerName1}**`);
        }
        else {
            return message.reply(`:x: No sticker exists with that name!`);
        }
    }
}
exports.default = RemoveSticker;
// Define the fields for the command
RemoveSticker.commandFields = new ICommandField_1.CommandField(`removesticker`, // NAME
`Removes a sticker to the user`, // DESCRIPTION
`removesticker [stickername]`, // USAGE - [] = MANDATORY () = OPTIONAL
[`removesticker based`], // EXAMPLES
CommandCategory_1.CommandCategory.ADMINISTRATION, // CATEGORY
1, // MIN ARGS
1, // MAX ARGS
[`MANAGE_MESSAGES`], // REQUIRED PERMS
false, // BOT OWNER ONLY
false, // TRUSTED ONLY
[], // BLACKLISTED USERS
[], // WHITELISTED GUILDS
false, // DELETE ON FINISH
true, // SIMULATE TYPING
500, // SPAM TIMEOUT
[`deletesticker`, `delsticker`] // ALIASES
);
//# sourceMappingURL=DeleteSticker.js.map