import { bot } from '../index';
import * as fs from "fs";

const config = bot.config;

// Use the punishment handler provided by Kaimund600
import Main, {PulsarGuild} from "../Main";
import { Message, TextChannel, MessageEmbed } from 'discord.js';



async function asyncForEach(array, callback): Promise<void> {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }


bot.on(`ready`, async () => {

    let botOwner = await bot.fetchUser(config.botOwner);


    await asyncForEach(Array.from( await bot.guilds.cache.values() ) , async function(guild) {
                // Create Pulsar Guild
             if(!await bot.pulsarGuilds.get(guild.id)){
                let currentPsGuild = new PulsarGuild(guild);
                await bot.pulsarGuilds.set(guild.id, currentPsGuild);
            }
    });


    // Repeating this check every set MS
    bot.setInterval(() => {

        bot.user.setActivity(bot.config.status, {
            type: bot.config.statusType
        });


        bot.guilds.cache.forEach(async function(guild) {

            // Create Pulsar Guilds
            if(!await bot.pulsarGuilds.get(guild.id)){
                let currentPsGuild = new PulsarGuild(guild);
                await bot.pulsarGuilds.set(guild.id, currentPsGuild);
            }



        });


    }, 5 * 1000); // Repeat every 5 seconds

    bot.guilds.cache.forEach(async function(serverlist) {
        let currentuser = await bot.fetchUser(serverlist.ownerID);
        console.log(`${serverlist.name}  with id  ${serverlist.id} || Guild owned by ${currentuser.tag} (${currentuser.id})`);
    });

    bot.channels.cache.forEach(channel => {
        if(channel.type == "text"){

            let textChannel = channel as TextChannel;
            try {
                textChannel.stopTyping()
            }
            catch {
                null;
           }
        }
    })

    console.log(`----------------------------------`);
    console.log(`${bot.user.tag} is online on ${bot.guilds.cache.size} servers!`);
    console.log(`${config.botName} made by ${botOwner.tag} loaded!`);
    console.log(`----------------------------------`);

});
