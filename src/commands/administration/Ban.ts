// Import first-party classes
import Command from "../../modules/commandapi/Command";
import { CommandCategory } from "../../modules/commandapi/CommandCategory";
import Console from "../../modules/commandapi/interpreter/Console";
import { CommandField } from "../../modules/commandapi/ICommandField";
import Main from "../../Main";
import nodemailer from 'nodemailer';

// Import core Node modules and dependencies
import Discord from "discord.js";
import fs from 'fs';

import User from '../../modules/Models/User';

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
        `ban`, // NAME
        `Bans a user from the site`, // DESCRIPTION
        `ban [username] [reason] (time in days)`, // USAGE - [] = MANDATORY () = OPTIONAL
        [`ban basedradio 2h`], // EXAMPLES
        CommandCategory.ADMINISTRATION, // CATEGORY
        2, // MIN ARGS
        -1, // MAX ARGS
        [`BAN_MEMBERS`], // REQUIRED PERMS
        false, // BOT OWNER ONLY
        false, // TRUSTED ONLY
        [], // BLACKLISTED USERS
        [], // WHITELISTED GUILDS
        false, // DELETE ON FINISH
        true, // SIMULATE TYPING
        500, // SPAM TIMEOUT
        [`banuser`, `banfromsite`, `tempban`, `permban`, `suspend`] // ALIASES
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
        if (!args[0]) return message.reply(":x: Usage: `t!ban <username>`");
        let time;
        const userFound: any = await User.findOne({ username: args[0].toLowerCase() });
        if (!userFound) return message.channel.send(`:x: The username you provided was invalid!`);

        if (parseInt(args[args.length - 1])) time = parseInt(args[args.length - 1]);
        let reasonArr = args;
        reasonArr.splice(0, 1);
        console.log(reasonArr);
        if (time) reasonArr = reasonArr.slice(0, -1);
        console.log(reasonArr);
        let reason;
        if (reasonArr.length > 0) reason = reasonArr.join(` `);
        else reason = `TOS Violation`;

        if (time) {
            const todayTimestamp = Date.now();

            const millisecondsToAdd = time * 24 * 60 * 60 * 1000;

            const finalTime: number = todayTimestamp + millisecondsToAdd;

            const banTimers = JSON.parse(fs.readFileSync(`./data/banTimers.json`).toString());
            banTimers[`${userFound.username}`] = finalTime;

            console.log(banTimers);
            await fs.writeFileSync(`./data/banTimers.json`, JSON.stringify(banTimers, null, 4));

            message.reply(`:white_check_mark: **${userFound.username}** has been banned for **${time}** days!`);
        } else {
            const banTimers = JSON.parse(fs.readFileSync(`./data/banTimers.json`).toString());
            if (banTimers[`${userFound.username}`]) delete banTimers[`${userFound.username}`];
            await fs.writeFileSync(`./data/banTimers.json`, JSON.stringify(banTimers, null, 4));

            message.reply(`:white_check_mark: **${userFound.username}** has been permanently banned!`);
        }

        userFound.isSuspended = true;
        userFound.live = false;
        userFound.save();

        const reportEmbed = new Discord.MessageEmbed()
            .setAuthor(`Ban`, message.author.displayAvatarURL())
            .setThumbnail(userFound.avatar_url)
            .setColor(`#800000`)
            .addField(`User`, `[${userFound.username}](https://throwdown.tv/${userFound.username})`)
            .addField(`Moderator`, `<@${message.author.id}> (${message.author.tag})`)
            .setTimestamp()
            .setFooter(`throwdown.tv`, message.guild.iconURL());
        if (time) reportEmbed.addField(`Time`, `${time} Days`);
        if (!time) reportEmbed.addField(`Time`, `Infinite`);
        if (reason) reportEmbed.addField(`Reason`, reason);
        (<Discord.TextChannel> await bot.channels.cache.get(`794268909251330120`)).send(reportEmbed);

        const mailOptions = {
            from: `Throwdown TV <no-reply@throwdown.tv>`,
            to: userFound.email,
            subject: `Throwdown.TV Account Suspended`,
            text: `Hello ${userFound.username}, \n\nYour Throwdown.TV Account has been suspended due to policy violations. If you think this was a mistake, please contact us.`
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
