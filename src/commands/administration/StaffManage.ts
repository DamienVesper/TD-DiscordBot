// Import first-party classes
import Command from "../../modules/commandapi/Command";
import { CommandCategory } from "../../modules/commandapi/CommandCategory";
import Console from "../../modules/commandapi/interpreter/Console";
import { CommandField } from "../../modules/commandapi/ICommandField";
import Main from "../../Main";

// Import core Node modules and dependencies
import Discord from "discord.js";

import User from '../../modules/Models/User';

export default class StaffManage extends Command {
    // Define the fields for the command
    private static commandFields = new CommandField(
        `staffmanage`, // NAME
        `Allows you to give or take Staff Rank to a user`, // DESCRIPTION
        `staffmanage [give/take] [username]`, // USAGE - [] = MANDATORY () = OPTIONAL
        [`staffmanage give xsev`], // EXAMPLES
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
        [`givestaff`, `staff`] // ALIASES
    );

    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor (cmdConsole:Console) {
        // Call the superclass with the command fields
        super(StaffManage.commandFields, cmdConsole);
    }

    public async run (bot:Main, message:Discord.Message, args:string[], calledName:string):Promise<any> {
        if (!args[0]) return message.reply(":x: Usage: `t!staff <give|take> <username>`");
        if (args[0].toLowerCase() !== `give` && args[0].toLowerCase() !== `take`) return message.reply(`:x: Your first argument has to be \`give\` or \`take\`!`);

        const userFound: any = await User.findOne({ username: args[1].toLowerCase() });
        if (!userFound) return message.channel.send(`:x: The username you provided was invalid or does not exist!`);

        if (args[0].toLowerCase() === `give`) {
            userFound.perms.staff = true;
            userFound.save();
        } else {
            userFound.perms.staff = false;
            userFound.save();
        }

        return message.reply(`:white_check_mark: Updated Staff status of **${userFound.username}** to **${userFound.perms.staff}**`);
    }
}
