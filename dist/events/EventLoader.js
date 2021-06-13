"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventHandler = void 0;
const chalk_1 = __importDefault(require("chalk"));
const glob_1 = __importDefault(require("glob"));
// Loading in all of the events
class eventHandler {
    constructor(bot, cmdInterpreter) {
        console.log(`[EVENTS] Event loader started!`);
        glob_1.default(`${__dirname}/*`, { absolute: false }, (error, files) => {
            files = files.filter(f => f.endsWith(`.js`) || f.endsWith(`.ts`));
            if (files.length <= 1)
                return console.log(`[WARNING] There are no events to load...`);
            const fileRegexTS = new RegExp(/\/{0}([A-z-/\d]){1,100}([^A-z.ts]){1}/g); // converts the whole url path to just fileName
            const fileRegexJS = new RegExp(/\/{0}([A-z-/\d]){1,100}([^A-z.js]){1}/g); // converts the whole url path to just fileName
            let i = 0;
            console.log(chalk_1.default.yellow(`[EVENTS] Loading ${files.length - 1} Events...`));
            files.forEach(async (f) => {
                const formattedEvent = f.replace(fileRegexTS, ``).replace(fileRegexJS, ``);
                if (f.includes(`EventLoader`))
                    return; // Dont load the event loaded lmao
                require(`${f}`);
                console.log(`[EVENTS] ${i + 1}: ${formattedEvent} loaded!`);
                i++;
            });
        });
    }
}
exports.eventHandler = eventHandler;
//# sourceMappingURL=EventLoader.js.map