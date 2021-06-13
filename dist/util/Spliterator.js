"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines array split and join methods
 * for use in argument parsing
 * @author Spotlightsrule
 */
class Spliterator {
    /**
     * Splits a string at every whitespace
     * character
     * @param strIn The string to split
     * @return <b>string[]</b> The resulting split array of strings
     * @see https://regex101.com/r/DPheU4
     */
    static split(strIn) {
        // Create an array to hold the split string
        const splitStr = [];
        // Create a matcher to find anything but quotations and backticks
        const splitMatcher = strIn.match(/(('.*?')|(\".*?\")|(`.*?`)|\S+)/g);
        // Loop over the matcher finds
        for (const matcherFind of splitMatcher) {
            // Get the current item found by the matcher
            let curMatcherFind = (matcherFind);
            // Check if the current matcher find is enclosed within balanced quotes or backticks
            if (new RegExp(/([\"'`])(?:(?=(\\?))\2.)*?\1/g).test(curMatcherFind)) {
                // Strip all quotes and backticks from the string
                curMatcherFind = curMatcherFind.substring(1, (curMatcherFind.length - 1));
            }
            // Add the current matcher item to the split string ArrayList
            splitStr.push(curMatcherFind.replace(`\\`, ``));
        }
        // Return the split string ArrayList as an array of strings
        return splitStr;
    }
}
exports.default = Spliterator;
//# sourceMappingURL=Spliterator.js.map