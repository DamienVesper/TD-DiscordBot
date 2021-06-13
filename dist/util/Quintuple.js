"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a five-element tuple
 * @param <A> First tuple element
 * @param <B> Second tuple element
 * @param <C> Third tuple element
 * @param <D> Fourth tuple element
 * @param <E> Fifth tuple element
 * @author Spotlightsrule
 */
class Quintuple {
    // Class constructor
    /**
     * Constructs a new quintuple given three elements of any type
     * @param elemOne Element one of the new quintuple
     * @param elemTwo Element two of the new quintuple
     * @param elemThree Element three of the new quintuple
     * @param elemFour Element four of the new quintuple
     * @param elemFive Element five of the new quintuple
     */
    constructor(elemOne, elemTwo, elemThree, elemFour, elemFive) {
        // Assign the class variables from the constructor's parameters
        this.elemOne = elemOne;
        this.elemTwo = elemTwo;
        this.elemThree = elemThree;
        this.elemFour = elemFour;
        this.elemFive = elemFive;
    }
    // Getters
    /**
     * Returns the first quintuple element
     * @return <b>A</b> The first element in the quintuple
     */
    getElemOne() {
        return this.elemOne;
    }
    /**
     * Returns the second quintuple element
     * @return <b>B</b> The second element in the quintuple
     */
    getElemTwo() {
        return this.elemTwo;
    }
    /**
     * Returns the third quintuple element
     * @return <b>C</b> The third element in the quintuple
     */
    getElemThree() {
        return this.elemThree;
    }
    /**
     * Returns the fourth quintuple element
     * @return <b>D</b> The fourth element in the quintuple
     */
    getElemFour() {
        return this.elemFour;
    }
    /**
     * Returns the fifth quintuple element
     * @return <b>E</b> The fifth element in the quintuple
     */
    getElemFive() {
        return this.elemFive;
    }
    // Setters
    /**
     * Sets the contents of the first quintuple element
     * @param elemOne The new contents of element one
     */
    setElemOne(elemOne) {
        this.elemOne = elemOne;
    }
    /**
     * Sets the contents of the second quintuple element
     * @param elemTwo The new contents of element two
     */
    setElemTwo(elemTwo) {
        this.elemTwo = elemTwo;
    }
    /**
     * Sets the contents of the third quintuple element
     * @param elemThree The new contents of element three
     */
    setElemThree(elemThree) {
        this.elemThree = elemThree;
    }
    /**
     * Sets the contents of the fourth quintuple element
     * @param elemFour The new contents of element four
     */
    setElemFour(elemFour) {
        this.elemFour = elemFour;
    }
    /**
     * Sets the contents of the fifth quintuple element
     * @param elemFive The new contents of element five
     */
    setElemFive(elemFive) {
        this.elemFive = elemFive;
    }
}
exports.default = Quintuple;
//# sourceMappingURL=Quintuple.js.map