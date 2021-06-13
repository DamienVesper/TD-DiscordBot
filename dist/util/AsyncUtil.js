"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import core Node modules and dependencies
const NFS = __importStar(require("fs"));
const Path = __importStar(require("path"));
/**
 * A series of utility functions for
 * working with asynchronous operations
 * @author Spotlightsrule
 */
class AsyncUtil {
    /**
     * Runs a for loop over an array asynchronously.
     * EXAMPLE: AsyncUtil.asyncFor(arr, async(i) => {<stuff>});
     * @param T Allows generic types to be used
     * @param array The array to iterate over
     * @param callback The callback function to call
     * @return <b>Promise<void></b> The result of the callback function
     */
    static async asyncFor(array, callback) {
        // Run a regular for loop
        for (let index = 0; index < array.length; index++) {
            // Wait for the callback function to complete
            await (callback(index, array));
        }
    }
    /**
     * Runs a forEach loop asynchronously. EXAMPLE:
     * AsyncUtil.asyncForEach(arr, async(i, callback) => {<stuff>});
     * @author SeverePain
     * @param T Allows generic types to be used
     * @param array The array to iterate over
     * @param callback The callback function to call
     * @return <b>Promise<void></b> The result of the callback function
     */
    static async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
    /**
     * Runs a for loop iterator asynchronously
     * EXAMPLE: AsyncUtil.asyncFor(arr, async(i) => {<stuff>});
     * @param start The number from which to start
     * @param end The number at which to end
     * @param callback The callback function to call
     * @return <b>Promise<void></b> The result of the callback function
     */
    static async asyncForIterate(start, end, callback) {
        // Run a regular for loop from the start to the end index
        for (let index = start; index < end; index++) {
            // Wait for the callback function to complete
            await (callback(index));
        }
    }
    /**
     * Recursively "walks" through a directory,
     * returning all of the file paths that it
     * finds
     * @author SirMorfield
     * @see https://gist.github.com/kethinov/6658166#gistcomment-2934861
     * @param tDir The directory to recursively list
     * @param fileList The list of file paths in the directory listing (only required when called recursively)
     * @return <b>Promise<string[]></b> The recursive directory listing
     */
    static async asyncWalk(tDir, fileList = []) {
        // Get the directory listing of the current directory
        const files = (await NFS.readdirSync(tDir));
        // Loop over the listing
        for (const file of files) {
            // Stat the current path listing
            const stat = (await NFS.statSync(Path.normalize(Path.join(tDir, file))));
            // Run the function recursively if the statted path is a directory
            if (stat.isDirectory())
                fileList = (await AsyncUtil.asyncWalk(Path.normalize(Path.join(tDir, file)), fileList));
            // Push the current path onto the paths array if it's not a directory
            else
                fileList.push(Path.normalize(Path.join(tDir, file)));
        }
        // Return the filled file list
        return fileList;
    }
    /**
     * Delays the execution of a lambda
     * until a given time (in milliseconds)
     * runs out. USAGE EXAMPLE:
     * delay(3000).then(() => console.log('Hello'));
     * @param millis The time in milliseconds to delay the resolution of the promise
     * @author Sébastien Rosset
     * @see https://stackoverflow.com/a/52408852
     */
    static async delay(millis) {
        // Return the promise after x milliseconds
        return (await new Promise(resolve => setTimeout(resolve, millis)));
    }
}
exports.default = AsyncUtil;
//# sourceMappingURL=AsyncUtil.js.map