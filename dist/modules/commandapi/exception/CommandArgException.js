"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines an exception that is thrown when the
 * argument count for a command is out of the
 * acceptable range for that command. IMPORTANT:
 * This exception MUST be checked for via {@code try}
 * blocks, as this exception is used to ensure
 * argument counts for commands. Please check for
 * it or your application will crash when
 * given a bad argument count
 * @author Spotlightsrule
 */
class CommandArgException extends Error {
    /**
     * Constructs a new {@code CommandArgException}
     * @constructor
     * @param excMessage The message to output when this exception is thrown
     */
    constructor(excMessage) {
        // Call the superclass with the user provided error message
        super(excMessage);
        // Set the error parameters
        this.name = `CommandArgException`;
        this.message = excMessage;
        this.stack = new Error().stack;
    }
    // toString override
    toString() {
        return `${this.name}: ${this.message}`;
    }
}
exports.default = CommandArgException;
//# sourceMappingURL=CommandArgException.js.map