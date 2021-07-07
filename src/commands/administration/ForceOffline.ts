
// Import first-party classes
import Command from "../../modules/commandapi/Command";
import { CommandCategory } from "../../modules/commandapi/CommandCategory";
import Console from "../../modules/commandapi/interpreter/Console";
import { CommandField } from "../../modules/commandapi/ICommandField";
import Main from "../../Main";
// Import core Node modules and dependencies
import Discord from "discord.js";
import User from '../../modules/Models/User';

export default class DeleteAccount extends Command {
    // Define the fields for the command
    private static commandFields = new CommandField(
        `forceoffline`, // NAME
        `Force a streamer offline`, // DESCRIPTION
        `forceoffline [username]`, // USAGE - [] = MANDATORY () = OPTIONAL
        [`forceoffline xsev`], // EXAMPLES
        CommandCategory.ADMINISTRATION, // CATEGORY
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
        [`kill`, `fo`] // ALIASES
    );

    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor (cmdConsole:Console) {
        // Call the superclass with the command fields
        super(DeleteAccount.commandFields, cmdConsole);
    }

    public async run (bot:Main, message:Discord.Message, args:string[], calledName:string):Promise<any> {
        if (!args[0]) return message.reply(":x: Usage: `t!forceoffline <username>`");
        const user: any = await User.findOne({ username: args[0].toLowerCase() });
        if (!user) return message.channel.send(`:x: The username you provided was invalid!`);

        user.live = false;
        user.settings.rtmpServer = `live`;

        user.save();

        return message.reply(`:white_check_mark: Forced **${user.username}** offline.`);
    }
}
