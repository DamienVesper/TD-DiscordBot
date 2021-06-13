"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const BanManager_1 = require("../modules/BanManager");
// Use the punishment handler provided by Kaimund600
const Main_1 = require("../Main");
const config = index_1.bot.config;
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
index_1.bot.on(`ready`, async () => {
    const botOwner = await index_1.bot.fetchUser(config.botOwner);
    await asyncForEach(Array.from(await index_1.bot.guilds.cache.values()), async (guild) => {
        // Create Pulsar Guild
        if (!await index_1.bot.pulsarGuilds.get(guild.id)) {
            const currentPsGuild = new Main_1.PulsarGuild(guild);
            await index_1.bot.pulsarGuilds.set(guild.id, currentPsGuild);
        }
    });
    // Repeating this check every set MS
    index_1.bot.setInterval(() => {
        index_1.bot.user.setActivity(index_1.bot.config.status, {
            type: index_1.bot.config.statusType
        });
        index_1.bot.guilds.cache.forEach(async (guild) => {
            // Create Pulsar Guilds
            if (!await index_1.bot.pulsarGuilds.get(guild.id)) {
                const currentPsGuild = new Main_1.PulsarGuild(guild);
                await index_1.bot.pulsarGuilds.set(guild.id, currentPsGuild);
            }
        });
    }, 5 * 1000); // Repeat every 5 seconds
    index_1.bot.guilds.cache.forEach(async (serverlist) => {
        const currentuser = await index_1.bot.fetchUser(serverlist.ownerID);
        console.log(`${serverlist.name}  with id  ${serverlist.id} || Guild owned by ${currentuser.tag} (${currentuser.id})`);
    });
    index_1.bot.channels.cache.forEach(channel => {
        if (channel.type == `text`) {
            const textChannel = channel;
            try {
                textChannel.stopTyping();
            }
            catch (_a) {
                null;
            }
        }
    });
    const manager = new BanManager_1.BanManager();
    await manager.start();
    console.log(`----------------------------------`);
    console.log(`${index_1.bot.user.tag} is online on ${index_1.bot.guilds.cache.size} servers!`);
    console.log(`${config.botName} made by ${botOwner.tag} loaded!`);
    console.log(`----------------------------------`);
});
//# sourceMappingURL=ready.js.map