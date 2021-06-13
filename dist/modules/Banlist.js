"use strict";
const index_1 = require("../index");
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
// Converts the banlist into a more readable format (object[])
async function getBanList(guildID) {
    const banListArr = [];
    const guild = index_1.bot.guilds.cache.get(guildID);
    await guild.fetchBans().then(async (banlist) => {
        banlist.forEach(async (r) => {
            const reason = r.reason;
            const user = r.user;
            const tempObj = {
                id: user.id,
                tag: `${user.username}#${user.discriminator}`,
                avatarURL: user.avatarURL(),
                bot: user.bot,
                reason: null
            };
            if (reason) {
                tempObj.reason = reason;
            }
            else {
                tempObj.reason = null;
            }
            banListArr.push(tempObj);
        });
    });
    return banListArr;
}
// Simplifies the usage of the banlist making my life easier
class Banlist {
    constructor(serverID) {
        this.guildID = serverID;
    }
    async getEntries() {
        const returnObj = await getBanList(this.guildID);
        return returnObj;
    }
    async isBanned(userID) {
        const banlist = await this.getEntries();
        const foundEntry = false;
        const filteredList = await banlist.filter(obj => obj.id === userID);
        if (filteredList.length == 1)
            return true;
        else
            return false;
    }
    async getBan(userID) {
        const banlist = await this.getEntries();
        const matchingBans = await banlist.filter((b) => b.id == userID);
        if (!matchingBans)
            return { found: false };
        else {
            matchingBans[0].found = true;
            return matchingBans[0];
        }
    }
}
module.exports = Banlist;
//# sourceMappingURL=Banlist.js.map