import * as fs from 'fs';
import Interpreter from '../modules/commandapi/interpreter/Interpreter';
import Pulsar from '../handlers/Pulsar';
import chalk from 'chalk';
import glob from 'glob';
import Main from '../Main';

// Loading in all of the events

export class eventHandler {
    private bot:Main;
    private cmdInterpreter:Interpreter;

    constructor (bot: Main, cmdInterpreter:Interpreter) {
        console.log(`[EVENTS] Event loader started!`);
        glob(`${__dirname}/*`, { absolute: false }, (error, files) => {
            files = files.filter(f => f.endsWith(`.js`) || f.endsWith(`.ts`));
            if (files.length <= 1) return console.log(`[WARNING] There are no events to load...`);
            const fileRegexTS = new RegExp(/\/{0}([A-z-/\d]){1,100}([^A-z.ts]){1}/g); // converts the whole url path to just fileName
            const fileRegexJS = new RegExp(/\/{0}([A-z-/\d]){1,100}([^A-z.js]){1}/g); // converts the whole url path to just fileName
            let i = 0;
            console.log(chalk.yellow(`[EVENTS] Loading ${files.length - 1} Events...`));
            files.forEach(async f => {
                const formattedEvent:string = f.replace(fileRegexTS, ``).replace(fileRegexJS, ``);
                if (f.includes(`EventLoader`)) return; // Dont load the event loaded lmao
                require(`${f}`);
                console.log(`[EVENTS] ${i + 1}: ${formattedEvent} loaded!`);
                i++;
            });
        });
    }
}
