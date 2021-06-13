"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines a generic exception that is
 * thrown when an issue occurs while
 * running a command
 * @author Spotlightsrule
 */
class CommandException extends Error {
    /**
     * Constructs a new {@code CommandException}
     * @constructor
     * @param excMessage The message to output when this exception is thrown
     */
    constructor(excMessage) {
        // Call the superclass with the user provided error message
        super(excMessage);
        // Set the error parameters
        this.name = `CommandException`;
        this.message = excMessage;
        this.stack = new Error().stack;
    }
    // toString override
    toString() {
        return `${this.name}: ${this.message}`;
    }
}
exports.default = CommandException;
//# sourceMappingURL=CommandException.js.map