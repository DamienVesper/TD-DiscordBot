// Import first-party classes
import Command from "../../modules/commandapi/Command";
import { CommandCategory } from "../../modules/commandapi/CommandCategory";
import Console from "../../modules/commandapi/interpreter/Console";
import { CommandField } from "../../modules/commandapi/ICommandField";
import Main from "../../Main";
// Import core Node modules and dependencies
import Discord from "discord.js";
import fs from 'fs';
import User from '../../modules/Models/User';
import nodemailer from 'nodemailer';

// Nodemailer.
const transport = nodemailer.createTransport({
    host: `localhost`,
    port: 25,
    secure: false,
    auth: {
        user: process.env.SMTP_USERNAME,
        password: process.env.SMTP_TOKEN
    },
    tls: {
        rejectUnauthorized: false
    }
});

export default class Ban extends Command {
    // Define the fields for the command
    private static commandFields = new CommandField(
        `unban`, // NAME
        `unbans a user from the site`, // DESCRIPTION
        `unban [username]`, // USAGE - [] = MANDATORY () = OPTIONAL
        [`unban xsev`], // EXAMPLES
        CommandCategory.ADMINISTRATION, // CATEGORY
        1, // MIN ARGS
        1, // MAX ARGS
        [`BAN_MEMBERS`], // REQUIRED PERMS
        false, // BOT OWNER ONLY
        false, // TRUSTED ONLY
        [], // BLACKLISTED USERS
        [], // WHITELISTED GUILDS
        false, // DELETE ON FINISH
        true, // SIMULATE TYPING
        500, // SPAM TIMEOUT
        [`unbanuser`, `unsuspend`] // ALIASES
    );

    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor (cmdConsole:Console) {
        // Call the superclass with the command fields
        super(Ban.commandFields, cmdConsole);
    }

    public async run (bot:Main, message:Discord.Message, args:string[], calledName:string):Promise<any> {
        if (!args[0]) return message.reply(":x: Usage: `t!unban <username>`");
        const userFound: any = await User.findOne({ username: args[0].toLowerCase() });
        if (!userFound) return message.channel.send(`:x: The username you provided was invalid!`);

        const banTimers = JSON.parse(fs.readFileSync(`./data/banTimers.json`).toString());
        if (banTimers[`${userFound.username}`]) delete banTimers[`${userFound.username}`];
        await fs.writeFileSync(`./data/banTimers.json`, JSON.stringify(banTimers, null, 4));

        if (!userFound.isSuspended) return message.reply(`:x: That user is not banned.`);

        message.reply(`:white_check_mark: **${userFound.username}** has been unbanned!`);

        userFound.isSuspended = false;
        userFound.save();

        const reportEmbed = new Discord.MessageEmbed()
            .setAuthor(`Unban`, message.author.displayAvatarURL())
            .setThumbnail(userFound.avatar_url)
            .setColor(`#00db04`)
            .addField(`User`, `[${userFound.username}](https://throwdown.tv/${userFound.username})`)
            .addField(`Moderator`, `<@${message.author.id}> (${message.author.tag})`)
            .setTimestamp()
            .setFooter(`throwdown.tv`, message.guild.iconURL());
        (<Discord.TextChannel> await bot.channels.cache.get(`794268909251330120`)).send(reportEmbed);

        const mailOptions = {
            from: `Throwdown TV <no-reply@throwdown.tv>`,
            to: userFound.email,
            subject: `Throwdown.TV Account Suspension Removed`,
            text: `Hello ${userFound.username}, \n\nYour Throwdown.TV Account has been unsuspended.`
        };

        if (process.env.ENV === `prod`) {
            transport.sendMail(mailOptions, err => {
                if (err) {
                    return console.log(err);
                }
            });
        }
    }
}
