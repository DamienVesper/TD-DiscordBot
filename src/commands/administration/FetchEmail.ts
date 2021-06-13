// Import first-party classes
import Command from "../../modules/commandapi/Command";
import { CommandCategory } from "../../modules/commandapi/CommandCategory";
import Console from "../../modules/commandapi/interpreter/Console";
import { CommandField } from "../../modules/commandapi/ICommandField";
import Main from "../../Main";
// Import core Node modules and dependencies
import Discord from "discord.js";
import User from '../../modules/Models/User';

export default class FetchEmail extends Command {
    // Define the fields for the command
    private static commandFields = new CommandField(
        `fetchemail`, // NAME
        `Gets user email`, // DESCRIPTION
        `fetchemail [stickername]`, // USAGE - [] = MANDATORY () = OPTIONAL
        [`fetchemail sev`], // EXAMPLES
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
        [`getemail`] // ALIASES
    );

    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor (cmdConsole:Console) {
        // Call the superclass with the command fields
        super(FetchEmail.commandFields, cmdConsole);
    }

    public async run (bot:Main, message:Discord.Message, args:string[], calledName:string):Promise<any> {
        if (!args[0]) return message.reply(":x: Usage: `t!getemail <username>`");
        // Assert the argument count
        super.assertArgCount(args.length, message);

        if (message.channel.id !== `794326024858763304`) return message.reply(`:x: This command can only be used in <#794326024858763304>`);

        const userFound: any = await User.findOne({ username: args[0] });
        if (!userFound) return message.channel.send(`:x: The username you provided was invalid!`);

        message.reply(`:white_check_mark: The email address for user **${userFound.username}** is ||${userFound.email}||`);
    }
}
