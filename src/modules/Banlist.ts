import { bot } from '../index';
import { User } from 'discord.js';

async function asyncForEach (array: any[], callback): Promise<void> {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

// Converts the banlist into a more readable format (object[])
async function getBanList (guildID: string): Promise<object[]> {
    const banListArr = [];
    const guild = bot.guilds.cache.get(guildID);
    await guild.fetchBans().then(async (banlist) => {
        banlist.forEach(async (r) => {
            const reason: string = r.reason;
            const user: User = r.user;
            const tempObj = {
                id: user.id,
                tag: `${user.username}#${user.discriminator}`,
                avatarURL: user.avatarURL(),
                bot: user.bot,
                reason: null
            };
            if (reason) {
                tempObj.reason = reason;
            } else {
                tempObj.reason = null;
            }
            banListArr.push(tempObj);
        });
    });
    return banListArr;
}

// Simplifies the usage of the banlist making my life easier
class Banlist {
    guildID: string

    constructor (serverID: string) {
        this.guildID = serverID;
    }

    async getEntries (): Promise<object[]> {
        const returnObj = await getBanList(this.guildID);
        return returnObj;
    }

    async isBanned (userID: string): Promise<boolean> {
        const banlist = await this.getEntries();

        const foundEntry = false;
        const filteredList = await banlist.filter(obj => (<any> obj).id === userID);

        if (filteredList.length == 1) return true;
        else return false;
    }

    async getBan (userID: string): Promise<object> {
        const banlist = await this.getEntries();

        const matchingBans = await banlist.filter((b: any) => b.id == userID);

        if (!matchingBans) return { found: false };
        else {
            (<any> matchingBans[0]).found = true;
            return matchingBans[0];
        }
    }
}

export = Banlist
