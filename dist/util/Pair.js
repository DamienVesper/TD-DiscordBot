"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a two-element tuple
 * @param <X> First tuple element
 * @param <Y> Second tuple element
 * @author Spotlightsrule
 */
class Pair {
    // Class constructor
    /**
     * Constructs a new pair given two elements of any type
     * @param elemOne Element one of the new pair
     * @param elemTwo Element two of the new pair
     */
    constructor(elemOne, elemTwo) {
        // Assign the class variables from the constructor's parameters
        this.elemOne = elemOne;
        this.elemTwo = elemTwo;
    }
    // Getters
    /**
     * Returns the first pair element
     * @return <b>X</b> The first element in the pair
     */
    getElemOne() {
        return this.elemOne;
    }
    /**
     * Returns the second pair element
     * @return <b>Y</b> The second element in the pair
     */
    getElemTwo() {
        return this.elemTwo;
    }
    // Setters
    /**
     * Sets the contents of the first pair element
     * @param elemOne The new contents of element one
     */
    setElemOne(elemOne) {
        this.elemOne = elemOne;
    }
    /**
     * Sets the contents of the second pair element
     * @param elemTwo The new contents of element two
     */
    setElemTwo(elemTwo) {
        this.elemTwo = elemTwo;
    }
}
exports.default = Pair;
//# sourceMappingURL=Pair.js.map