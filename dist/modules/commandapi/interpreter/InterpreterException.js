"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Defines a generic exception that is
 * thrown when an issue occurs in the
 * interpreter
 * @author Spotlightsrule
 */
class InterpreterException extends Error {
    /**
     * Constructs a new {@code InterpreterException}
     * @constructor
     * @param excMessage The message to output when this exception is thrown
     */
    constructor(excMessage) {
        // Call the superclass with the user provided error message
        super(excMessage);
        // Set the error parameters
        this.name = `InterpreterException`;
        this.message = excMessage;
        this.stack = new Error().stack;
    }
    // toString override
    toString() {
        return `${this.name}: ${this.message}`;
    }
}
exports.default = InterpreterException;
//# sourceMappingURL=InterpreterException.js.map