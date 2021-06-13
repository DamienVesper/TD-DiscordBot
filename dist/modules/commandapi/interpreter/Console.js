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
const fs = __importStar(require("fs"));
/**
 * Sends a message to the console and/or
 * a designated logging file
 * @author Spotlightsrule
 */
class Console {
    // Class constructors
    /**
     * Constructs a console instance
     * @constructor
     * @param logOutputPath OPTIONAL: The path to log incoming console messages
     */
    constructor(logOutputPath) {
        // Assign the class variables from the constructor's parameters
        this.logOutputPath = logOutputPath;
    }
    // TODO: rotate logs from the previous day
    out(soutContents) {
        // Check if the log output path is not null
        if (this.logOutputPath) {
            // Strip all ANSI escape sequences from the string
            soutContents = soutContents.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ``);
            // Create a WriteStream to write the console output to a file, appending to the file if it exists
            const consoleFileStream = (fs.createWriteStream(this.logOutputPath, { flags: `a` }));
            // Write the message to the file, appending a line ending to the end (LF only because UNIX > Windows)
            consoleFileStream.write(`${soutContents}\n`);
            // Close the stream to avoid memory leaks
            consoleFileStream.close();
        }
        // Send the message to the console via console.log
        console.log(soutContents);
    }
}
exports.default = Console;
//# sourceMappingURL=Console.js.map