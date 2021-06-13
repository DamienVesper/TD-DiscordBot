"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandField = void 0;
/**
 * Organizes the command fields into a
 * single class
 * @author Spotlightsrule
 */
class CommandField {
    /**
     * Constructs a new command field instance
     * @constructor
     * @param name The name of the command
     * @param description What the command does
     * @param usage The syntax for the command where [] is mandatory and () is optional
     * @param examples Examples of command usage
     * @param category The category of the command
     * @param minArgs The minimum argument count that must be passed
     * @param maxArgs The maximum argument count that must be passed
     * @param permsRequired The required permissions a user must possess in order to run the command
     * @param ownerOnly Locks down the command to the bot owner only
     * @param trustedOnly Locks down the command to trusted admins and the bot owner only
     * @param blacklistedUsers Prevents people in the list from using the command
     * @param whitelistedGuilds Prevents all but approved guilds in the list from using the command
     * @param deleteOnFinish Delete the sender's command call when the command execution finishes
     * @param simulateTyping Sets whether or not typing statuses should be sent
     * @param spamTimeout Prevents users from running a command more than once in x milliseconds
     * @param aliases OPTIONAL: Alternative names that the command can be called by
     */
    constructor(name, description, usage, examples, category, minArgs, maxArgs, permsRequired, ownerOnly, trustedOnly, blacklistedUsers, whitelistedGuilds, deleteOnFinish, simulateTyping, spamTimeout, aliases) {
        // Assign the command fields
        this.name = name;
        this.description = description;
        this.usage = usage;
        this.examples = examples;
        this.category = category;
        this.minArgs = minArgs;
        this.maxArgs = maxArgs;
        this.permsRequired = permsRequired;
        this.ownerOnly = ownerOnly;
        this.trustedOnly = trustedOnly;
        this.blacklistedUsers = blacklistedUsers;
        this.whitelistedGuilds = whitelistedGuilds;
        this.deleteOnFinish = deleteOnFinish;
        this.simulateTyping = simulateTyping;
        this.spamTimeout = spamTimeout;
        this.aliases = aliases;
    }
}
exports.CommandField = CommandField;
//# sourceMappingURL=ICommandField.js.map