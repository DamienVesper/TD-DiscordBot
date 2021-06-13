"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandCategory = void 0;
/**
 * Defines all of the available
 * command categories
 * @author Spotlightsrule
 */
var CommandCategory;
(function (CommandCategory) {
    /** Represents commands that are for guild administration */
    CommandCategory[CommandCategory["ADMINISTRATION"] = 0] = "ADMINISTRATION";
    /** Represents commands that are core to the bot or will have a global effect */
    CommandCategory[CommandCategory["CORE"] = 1] = "CORE";
    /** Represents commands that are specific to certain guilds */
    CommandCategory[CommandCategory["CUSTOM"] = 2] = "CUSTOM";
    /** Represents commands that are there to entertain users */
    CommandCategory[CommandCategory["FUN"] = 3] = "FUN";
    /** Represents commands that are unclassified */
    CommandCategory[CommandCategory["MISCELLANEOUS"] = 4] = "MISCELLANEOUS";
    /** Represents commands that are for guild moderation */
    CommandCategory[CommandCategory["MODERATION"] = 5] = "MODERATION";
    /** Represents commands that generate NSFW content (eg: nudity, suggestive material, porn, hentai, etc). These commands are locked to NSFW channels */
    CommandCategory[CommandCategory["NSFW"] = 6] = "NSFW";
    /** Represents commands that are there to help users */
    CommandCategory[CommandCategory["UTILITY"] = 7] = "UTILITY";
})(CommandCategory = exports.CommandCategory || (exports.CommandCategory = {}));
// Enum utilties (must be exported under the namespace header)
(function (CommandCategory) {
    /**
     * Creates a grammatical list of the
     * enum's contents
     * @author Spotlightsrule
     * @return <b>string</b> The list of the enum's contents
    */
    function values() {
        // Create a string to hold the list of enum values
        let enumValues = ``;
        // Get the number of elements in the enum
        // SEE: https://stackoverflow.com/a/54341904/7520602
        const enumLen = (Object.keys(CommandCategory).map((val, idx) => Number(isNaN(Number(val)))).reduce((a, b) => a + b, 0));
        // Loop over the enum
        for (const category in CommandCategory) {
            // Check if the current category is an index
            if (parseInt(category, 10) >= 0) {
                // Append it onto the enum list
                enumValues += (`${CommandCategory[category]}`);
                // Ensure that the current enum value is not at the end of the list
                if (parseInt(category) < (enumLen - 2)) {
                    // Append a delimiter onto the string
                    enumValues += (`, `);
                }
            }
        }
        // Return the filled enum values list
        return enumValues;
    }
    CommandCategory.values = values;
})(CommandCategory = exports.CommandCategory || (exports.CommandCategory = {}));
//# sourceMappingURL=CommandCategory.js.map