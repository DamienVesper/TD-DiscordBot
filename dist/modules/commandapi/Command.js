"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import first-party classes
const AsyncUtil_1 = __importDefault(require("../../util/AsyncUtil"));
const CommandArgException_1 = __importDefault(require("./exception/CommandArgException"));
const CommandException_1 = __importDefault(require("./exception/CommandException"));
const MathUtil_1 = __importDefault(require("../../util/MathUtil"));
// Import core Node modules and dependencies
const discord_js_1 = __importDefault(require("discord.js"));
/**
 * Forms the basis of all command classes
 * @author Spotlightsrule
 */
class Command {
    /**
     * Constructs a new command instance
     * @param commandFields The properties of the command
     * @param cmdConsole The reporting console
     */
    constructor(commandFields, cmdConsole) {
        // Assign the command fields
        this.name = commandFields.name;
        this.description = commandFields.description;
        this.usage = commandFields.usage;
        this.examples = commandFields.examples;
        this.category = commandFields.category;
        this.permsRequired = commandFields.permsRequired;
        this.ownerOnly = commandFields.ownerOnly;
        this.trustedOnly = commandFields.trustedOnly;
        this.blacklistedUsers = commandFields.blacklistedUsers;
        this.whitelistedGuilds = commandFields.whitelistedGuilds;
        this.deleteOnFinish = commandFields.deleteOnFinish;
        this.simulateTyping = commandFields.simulateTyping;
        this.spamTimeout = commandFields.spamTimeout;
        // Check if the min arg count is greater than the max args count and the max args variable isn't less than 0
        if ((commandFields.minArgs > commandFields.maxArgs) && (commandFields.maxArgs >= 0)) {
            // Throw a CommandException because the min arg count can't be greater than the max arg count
            throw new CommandException_1.default(`Min arg count can't exceed max arg count`);
        }
        else {
            // Assign the min and max args variables as usual
            this.minArgs = commandFields.minArgs;
            this.maxArgs = commandFields.maxArgs;
        }
        // Check if the aliases field is defined and assign a blank array to the aliases field if it isn't
        commandFields.aliases ? this.aliases = commandFields.aliases : [];
        // Assign the class variables from the constructor's parameters
        this.cmdConsole = cmdConsole;
        this.timeoutSet = new Set();
    }
    /**
     * Asserts that the argument count
     * for the command is within the min
     * and max range
     * @param argCount The number of arguments passed to the command
     * @throws CommandArgException If the command has a bad argument count
     */
    assertArgCount(argCount, message) {
        // Assign the minimum and maximum argument counts to throwaway variables to avoid modifications of the class variables
        let minArgs = this.minArgs;
        let maxArgs = this.maxArgs;
        // Check if the lower and upper bound arguments are less than 0 and set their values to just beyond the current argument count (fools the argument count assertion that these are within acceptable range, effectively removing the bound all together)
        minArgs = ((minArgs <= 0) ? (argCount - 1) : minArgs);
        maxArgs = ((maxArgs < 0) ? (argCount + 1) : maxArgs);
        // Check if the argument count is within the limits set for this command
        if (!(MathUtil_1.default.numberInRange(argCount, minArgs, maxArgs))) {
            // Create a string array to hold the phrases used for reporting the bad argument count
            const argLimPhrases = [`Not enough`, `minimum`, minArgs.toString()];
            // Check if the argument count was above the limit
            if (argCount > maxArgs) {
                // Set the bad argument phrases to their maximum counterparts instead
                argLimPhrases[0] = (`Too many`);
                argLimPhrases[1] = (`maximum`);
                argLimPhrases[2] = (maxArgs.toString());
            }
            // Throw a CommandArgException because the argument count is invalid (catch responsibility rests with the interpreter)
            throw new CommandArgException_1.default(`${argLimPhrases[0]} arguments supplied for command "${this.name}". The ${argLimPhrases[1]} allowed is ${argLimPhrases[2]}`);
        }
    }
    /**
     * Check if a member has permission to
     * run a particular command given the
     * command has the permissions field
     * populated and the permissions are
     * valid Discord permission flags
     * @param msgSender The sender of the command
     * @return <b>boolean</b> The status as to whether the user has permission to run the command
     */
    hasPermission(msgSender) {
        // Return the status as to whether the sender has permission or not
        return (this.hasReqPerms(msgSender, this.permsRequired));
    }
    /**
     * Helper function for Command#hasPermission
     * @param msgSender The sender of the command
     * @param permsRequired The required permission for the operation
     * @return <b>boolean</b> The status as to whether the user has permission to run the command
     */
    hasReqPerms(msgSender, permsRequired) {
        // Loop over the list of permissions the command requires
        for (const permIndex in permsRequired) {
            // Get the permission at the current index
            const curPerm = (permsRequired[permIndex]);
            // Check if the current permission is valid
            if (discord_js_1.default.Permissions.FLAGS[curPerm]) {
                // Check if the user possesses the current permission
                const hasPermission = (msgSender.hasPermission(discord_js_1.default.Permissions.FLAGS[curPerm]));
                // Check if the user lacks the current permission
                if (!(hasPermission)) {
                    // Return false because the user doesn't have access to the permission, essentially voiding their access to the entire command
                    return hasPermission;
                }
            }
        }
        // Return true because the user didn't lack any permissions to use the command
        return true;
    }
    /**
     * Retrieves a list any permissions that
     * the sender lacks
     * @param msgSender The sender of the command
     * @return <b>string[]</b> An array of all of the missing permissions by their flag name
     */
    getMissingPerms(msgSender) {
        // Create an array to hold the missing permissions
        const missingPerms = [];
        // Loop over the list of permissions the command requires
        for (const permIndex in this.permsRequired) {
            // Get the permission at the current index
            const curPerm = (this.permsRequired[permIndex]);
            // Check if the current permission is valid
            if (discord_js_1.default.Permissions.FLAGS[curPerm]) {
                // Check if the user possesses the current permission
                const hasPermission = (msgSender.hasPermission(discord_js_1.default.Permissions.FLAGS[curPerm]));
                // Check if the user lacks the current permission
                if (!(hasPermission)) {
                    // Push the current permission string onto the missing permissions array
                    missingPerms.push(curPerm);
                }
            }
        }
        // Return the filled missing permissions array
        return missingPerms;
    }
    /**
     * Queues a message for deletion given a
     * message object and the time in milliseconds
     * it shall live
     * @param message The message to queue for deletion
     * @param millis The time in milliseconds that the message shall last
     */
    async queueDelete(message, millis) {
        // Check if the message object is an array (https://stackoverflow.com/a/50523378)
        if ((Array.isArray(message)) && (message.every(item => typeof item === `string`))) {
            // Loop over every message object in the array
            for (const i in message) {
                // Queue the current message for deletion
                await (this.deleteMsg(message[i], millis));
            }
        }
        else {
            // Queue the message for deletion
            await (this.deleteMsg(message, millis));
        }
        // Resolve the promise
        return Promise.resolve();
    }
    /**
     * Queues an array of messages for deletion
     * @param messageQueue The queue of messages to delete. Uses tuples, so the Pair class is required for this
     */
    async queueArrayDelete(messageQueue) {
        // Loop over every array element
        for (const i in messageQueue) {
            // Pull out the variables from the pair
            const message = (messageQueue[i].getElemOne());
            const millis = (messageQueue[i].getElemTwo());
            // Queue the current message for deletion
            await (this.queueDelete(message, millis));
        }
        // Resolve the promise
        return Promise.resolve();
    }
    /**
     * Helper function for Command#queueDelete()
     * and Command#queueArrayDelete() that deletes
     * a message after x milliseconds
     * @param message The message to delete
     * @param millis The time the message shall live in milliseconds
     */
    async deleteMsg(message, millis) {
        // Set a time based on the millis number then run the deletion function
        await AsyncUtil_1.default.delay(millis).then(async () => {
            // Delete the message
            await message.delete();
            // Report the deletion event to the console
            await (this.cmdConsole.out(`Deleted response message "${(message.embeds.length > 0) ? `<RICH EMBED>` : message.content}" from channel "#${message.channel.name}" in server "${message.guild.name}".`));
        });
        // Resolve the promise
        return Promise.resolve();
    }
    /**
     * Checks if the sender has to wait before
     * sending another command
     * @param msgSender The user by ID trying to run the command
     * @return <b>boolean</b> The status as to whether the user can execute the command or not
     */
    antiSpamAllowMsg(msgSender) {
        // Set the required flags that the user needs
        const permFlags = [`MANAGE_MESSAGES`, `MANAGE_CHANNELS`, `MANAGE_GUILD`];
        // Check if the user has "manage messages", "manage channels", or "manage guild" permission
        if (this.hasReqPerms(msgSender, permFlags) || (this.spamTimeout <= 0)) {
            // Return true because the user has no timeout restrictions
            return true;
        }
        // Check if the user isn't already in the timeout set
        if (!(this.timeoutSet.has(msgSender.id))) {
            // Add the user's ID to the set
            this.timeoutSet.add(msgSender.id);
            // Queue the id to be deleted
            AsyncUtil_1.default.delay(this.spamTimeout).then(() => {
                // Delete the sender's entry after x milliseconds
                this.timeoutSet.delete(msgSender.id);
            });
            // Return true because the user has permission to run the command
            return true;
        }
        else {
            // Return false because the user previously ran the command and the timeout hasn't expired
            return false;
        }
    }
}
exports.default = Command;
//# sourceMappingURL=Command.js.map