// Import first-party classes
import Command from "../../modules/commandapi/Command";
import { CommandCategory } from "../../modules/commandapi/CommandCategory";
import Console from "../../modules/commandapi/interpreter/Console";
import { CommandField } from "../../modules/commandapi/ICommandField";
import Main from "../../Main";
// Import core Node modules and dependencies
import Discord from "discord.js";
import User from '../../modules/Models/User';

export default class ResetStreamKey extends Command {
    // Define the fields for the command
    private static commandFields = new CommandField(
        `resetstreamkey`, // NAME
        `Resets a users stream key`, // DESCRIPTION
        `resetstreamkey [username]`, // USAGE - [] = MANDATORY () = OPTIONAL
        [`resetstreamkey xsev`], // EXAMPLES
        CommandCategory.ADMINISTRATION, // CATEGORY
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

    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor (cmdConsole:Console) {
        // Call the superclass with the command fields
        super(ResetStreamKey.commandFields, cmdConsole);
    }

    public async run (bot:Main, message:Discord.Message, args:string[], calledName:string):Promise<any> {
        if (!args[0]) return message.reply(":x: Usage: `t!resetstreamkey <username>`");
        const userFound: any = await User.findOne({ username: args[0].toLowerCase() });
        if (!userFound) return message.channel.send(`:x: The username you provided was invalid!`);

        function makeid (length) {
            let result = ``;
            const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        const newstreamKey = await makeid(32);

        userFound.settings.streamKey = `${args[0].toLowerCase()}_${newstreamKey}`;
        userFound.save();

        return message.reply(`:white_check_mark: Reset the stream key of **${args[0]}**`);
    }
}
