"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const CommandCategory_1 = require("../modules/commandapi/CommandCategory");
const index_1 = require("../index");
const scriptName = path_1.default.basename(__filename).toString();
module.exports.loadCommands = () => {
    let version = ``;
    if (scriptName.toLowerCase().endsWith(`.ts`))
        version = `ts`;
    else
        version = `js`;
    // let commandsToSkip:string[] = ["commandlist"]; // MUST BE IN LOWERCASE
    const commandsToSkip = [`test`]; // MUST BE IN LOWERCASE
    glob_1.default(`${__dirname}/**/*.*`, { absolute: false }, (error, files) => {
        files = files.filter(f => !f.endsWith(`.map`));
        if (files.length === 0)
            return console.log(`[WARNING] Unable to locate any commands. The bot won't be able to respond to requests.`);
        else
            console.log(chalk_1.default.yellow(`[COMMAND] Loading ${files.length} commands...`));
        let i = 0;
        files.forEach(async (filePath) => {
            const fileRegex = new RegExp(/\/{0}([A-z-/\d]){1,100}([^A-z.ts]){1}/g); // converts the whole url path to just commandFileName.ts
            const fileRegexJS = new RegExp(/\/{0}([A-z-/\d]){1,100}([^A-z.js]){1}/g);
            const formattedBestCMD = null;
            if (version == `ts`)
                filePath.replace(fileRegex, ``);
            else
                filePath.replace(fileRegexJS, ``);
            // Check if the current search directory is the folder for the command utilities
            if (filePath.toLowerCase().includes(`util`)) {
                // Simply skip the folder, as this folder is for command class utilities and isn't meant to be registered with the interpreter
                return;
            }
            try {
                if (commandsToSkip.includes(formattedBestCMD.toLowerCase()) || commandsToSkip.includes(filePath.toLowerCase())) { // Checks if the file name is blacklisted
                    console.log(chalk_1.default.red(`[COMMAND] Skipping command - ${formattedBestCMD}`));
                    return;
                }
            }
            catch (_a) {
                null;
            }
            const cmd = require(filePath);
            if (!cmd.default)
                return;
            // Define the command instance to register
            let cmdObj = null;
            // Check if the command requires the interpreter as a parameter via reflection
            if (Reflect.has(new cmd.default(), `cmdInterpreter`)) {
                // Create an instance of the command with the interpreter parameter
                cmdObj = (new cmd.default(index_1.cmdConsole, index_1.cmdInterpreter));
            }
            else {
                // Create a new instance normally
                cmdObj = (new cmd.default(index_1.cmdConsole));
            }
            if (commandsToSkip) {
                let foundAMatch = false;
                cmdObj.aliases.forEach(item => {
                    if (commandsToSkip.includes(item.toLowerCase()))
                        foundAMatch = true;
                });
                if (commandsToSkip.includes(cmdObj.name) || foundAMatch) {
                    console.log(chalk_1.default.red(`[COMMAND] Skipping command ${cmdObj.name} [${CommandCategory_1.CommandCategory[cmdObj.category]}]`));
                    return;
                }
            }
            // Try to register the command
            try {
                // Register the command with the interpreter
                index_1.cmdInterpreter.register(cmdObj);
                console.log(`[COMMAND] ${i + 1}: ${cmdObj.name} [${CommandCategory_1.CommandCategory[cmdObj.category]}] - registered successfully!`);
            }
            catch (err) {
                // Report the error
                console.log(chalk_1.default.red(`[COMMAND/ERROR] ${i + 1}: ${cmdObj.name} [${CommandCategory_1.CommandCategory[cmdObj.category]}] - ${err.name} caught while trying to register: ${err.message}`));
            }
            i++;
        });
    });
};
//# sourceMappingURL=CommandLoader.js.map