"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BanManager = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = __importDefault(require("fs"));
const index_1 = require("../index");
const User_1 = __importDefault(require("./Models/User"));
class BanManager {
    constructor() {
        null;
    }
    calculateBanTimeRemaining(banTime) {
        const timeInHours = Math.floor(((banTime - Date.now()) / 1000) / 60);
        return timeInHours;
    }
    async start() {
        console.log(`Ban Manager Started`);
        setInterval(async () => {
            const banFile = JSON.parse(fs_1.default.readFileSync(`./data/banTimers.json`).toString());
            for (const prop in banFile) {
                if (banFile[prop] <= Date.now()) {
                    delete banFile[prop];
                    const userFound = await User_1.default.findOne({ username: prop });
                    userFound.banned = false;
                    userFound.banreason = `TOS Violation`;
                    userFound.save();
                    const mainGuild = index_1.bot.guilds.cache.get(`757587322958250085`);
                    const reportEmbed = new discord_js_1.MessageEmbed()
                        .setAuthor(`Ban Expired`)
                        .setThumbnail(userFound.avatar_url)
                        .setColor(`#00db04`)
                        .addField(`User`, `${userFound.username}`)
                        .setTimestamp()
                        .setFooter(`throwdown.tv`, mainGuild.iconURL());
                    (await index_1.bot.channels.cache.get(`794268909251330120`)).send(reportEmbed);
                }
            }
            await fs_1.default.writeFileSync(`./data/banTimers.json`, JSON.stringify(banFile, null, 4));
        }, 10 * 1000);
    }
}
exports.BanManager = BanManager;
//# sourceMappingURL=BanManager.js.map