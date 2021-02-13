import { MessageEmbed, TextChannel } from 'discord.js';
import fs from 'fs';

import { bot } from '../index';
import User from './Models/User';

export class BanManager {
    constructor () {
        null;
    }

    calculateBanTimeRemaining (banTime: number) {
        const timeInHours = Math.floor(((banTime - Date.now()) / 1000) / 60);
        return timeInHours;
    }

    async start () {
        console.log(`Ban Manager Started`);
        setInterval(async () => {
            const banFile = JSON.parse(fs.readFileSync(`./data/banTimers.json`).toString());
            for (const prop in banFile) {
                if (banFile[prop] <= Date.now()) {
                    delete banFile[prop];
                    const userFound: any = await User.findOne({ username: prop });
                    userFound.banned = false;
                    userFound.banreason = `TOS Violation`;
                    userFound.save();

                    const mainGuild = bot.guilds.cache.get(`757587322958250085`);
                    const reportEmbed = new MessageEmbed()
                        .setAuthor(`Ban Expired`)
                        .setThumbnail(userFound.avatar_url)
                        .setColor(`#00db04`)
                        .addField(`User`, `${userFound.username}`)
                        .setTimestamp()
                        .setFooter(`throwdown.tv`, mainGuild.iconURL());

                    (<TextChannel> await bot.channels.cache.get(`794268909251330120`)).send(reportEmbed);
                }
            }
            await fs.writeFileSync(`./data/banTimers.json`, JSON.stringify(banFile, null, 4));
        }, 10 * 1000);
    }
}
