"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import first-party classes
const Command_1 = __importDefault(require("../../modules/commandapi/Command"));
const CommandCategory_1 = require("../../modules/commandapi/CommandCategory");
const ICommandField_1 = require("../../modules/commandapi/ICommandField");
class MigrateBans extends Command_1.default {
    /**
     * Constructs a new instance of the "Test"
     * command class
     * @param cmdConsole The interpreter's console instance
     */
    constructor(cmdConsole) {
        // Call the superclass with the command fields
        super(MigrateBans.commandFields, cmdConsole);
    }
    async run(bot, message, args, calledName) {
        // Assert the argument count
        super.assertArgCount(args.length, message);
        const AsyncForEachModule = require(`../util/AsyncForEach`);
        const selfMember = await message.guild.members.cache.get(bot.user.id);
        if (!selfMember || !selfMember.hasPermission(`BAN_MEMBERS`)) {
            return message.reply(`:no_entry: I do not have permission to access this guilds banlist!`);
        }
        const psGuild = await bot.pulsarGuilds.get(message.guild.id);
        const thisBanList = await psGuild.banlist.getEntries();
        const successfulMigrations = [];
        const failedMigrations = [];
        if (args[0]) {
            let i = 0;
            await AsyncForEachModule.asyncForEach(args, async (guildID) => {
                if (!await bot.pulsarGuilds.get(guildID)) {
                    failedMigrations.push(guildID);
                    return;
                }
                else {
                    const guild = await bot.pulsarGuilds.get(guildID);
                    if (!guild.member(message.author.id)) {
                        failedMigrations.push(guildID);
                        return;
                    }
                    const guildMemberDesGuild = await guild.members.cache.get(message.author.id);
                    if (!guildMemberDesGuild.hasPermission(`MANAGE_GUILD`) || !guildMemberDesGuild.hasPermission(`BAN_MEMBERS`)) {
                        failedMigrations.push(guildID);
                        return;
                    }
                    await AsyncForEachModule.asyncForEach(thisBanList, async (banListEntry) => {
                        const banReason = banListEntry.reason || `No Ban Reason Provided`;
                        guild.ban(banListEntry.id, { days: 1, reason: `Pulsar Ban Migration - ${banReason}` });
                    });
                    successfulMigrations.push(guildID);
                }
                i++;
            });
        }
        if (args.length > 1 && successfulMigrations) {
            if (successfulMigrations.length == args.length) {
                return message.reply(`:white_check_mark: Successfully migrated ${thisBanList.length} bans to all of the guilds provided!`);
            }
            else {
                return message.reply(`:white_check_mark: Successfully migrated ${thisBanList.length} bans to ${successfulMigrations.length}/${args.length} guilds. Failed guild ids: \`${failedMigrations.join(`, `)}\`. Make sure you have the \`MANAGE_GUILD\` and \`BAN_MEMBERS\` permission in all of the guilds provided!`);
            }
        }
        else if (args.length > 1 && !successfulMigrations) {
            return message.reply(`:no_entry: Failed migrating the bans to all of the guilds provided! Please make sure that the args are valid and you have permission in all of the guilds! Make sure you have the \`MANAGE_GUILD\` and \`BAN_MEMBERS\` permission in all of the guilds provided!`);
        }
        else {
            if (successfulMigrations) {
                return message.reply(`:white_check_mark: Successfully migrated ${thisBanList.length} bans to the target guild ID!`);
            }
            else {
                return message.reply(`:no_entry: Failed migrating bans to the guild provided! Make sure you have the \`MANAGE_GUILD\` and \`BAN_MEMBERS\` permission in that guild!`);
            }
        }
    }
}
exports.default = MigrateBans;
// Define the fields for the command
MigrateBans.commandFields = new ICommandField_1.CommandField(`migratebans`, // NAME
`Copies the bans from one guild to another`, // DESCRIPTION
`migratebans [destination guild ID] (another destination guild id)`, // USAGE - [] = MANDATORY () = OPTIONAL
[`migratebans 451248270409334796 637784721568563220`], // EXAMPLES
CommandCategory_1.CommandCategory.ADMINISTRATION, // CATEGORY
1, // MIN ARGS
6, // MAX ARGS
[`BAN_MEMBERS`, `MANAGE_GUILD`], // REQUIRED PERMS
false, // BOT OWNER ONLY
false, // TRUSTED ONLY
[], // BLACKLISTED USERS
[], // WHITELISTED GUILDS
true, // DELETE ON FINISH
true, // SIMULATE TYPING
120000, // SPAM TIMEOUT
[`copybans`, `banmigration`, `mb`] // ALIASES
);
//# sourceMappingURL=MigrateBans.js.map