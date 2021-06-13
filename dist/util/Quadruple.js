"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a four-element tuple
 * @param <A> First tuple element
 * @param <B> Second tuple element
 * @param <C> Third tuple element
 * @param <D> Fourth tuple element
 * @author Spotlightsrule
 */
class Quadruple {
    // Class constructor
    /**
     * Constructs a new quadruple given three elements of any type
     * @param elemOne Element one of the new quadruple
     * @param elemTwo Element two of the new quadruple
     * @param elemThree Element three of the new quadruple
     * @param elemFour Element four of the new quadruple
     */
    constructor(elemOne, elemTwo, elemThree, elemFour) {
        // Assign the class variables from the constructor's parameters
        this.elemOne = elemOne;
        this.elemTwo = elemTwo;
        this.elemThree = elemThree;
        this.elemFour = elemFour;
    }
    // Getters
    /**
     * Returns the first quadruple element
     * @return <b>A</b> The first element in the quadruple
     */
    getElemOne() {
        return this.elemOne;
    }
    /**
     * Returns the second quadruple element
     * @return <b>B</b> The second element in the quadruple
     */
    getElemTwo() {
        return this.elemTwo;
    }
    /**
     * Returns the third quadruple element
     * @return <b>C</b> The third element in the quadruple
     */
    getElemThree() {
        return this.elemThree;
    }
    /**
     * Returns the fourth quadruple element
     * @return <b>D</b> The fourth element in the quadruple
     */
    getElemFour() {
        return this.elemFour;
    }
    // Setters
    /**
     * Sets the contents of the first quadruple element
     * @param elemOne The new contents of element one
     */
    setElemOne(elemOne) {
        this.elemOne = elemOne;
    }
    /**
     * Sets the contents of the second quadruple element
     * @param elemTwo The new contents of element two
     */
    setElemTwo(elemTwo) {
        this.elemTwo = elemTwo;
    }
    /**
     * Sets the contents of the third quadruple element
     * @param elemThree The new contents of element three
     */
    setElemThree(elemThree) {
        this.elemThree = elemThree;
    }
    /**
     * Sets the contents of the fourth quadruple element
     * @param elemFour The new contents of element four
     */
    setElemFour(elemFour) {
        this.elemFour = elemFour;
    }
}
exports.default = Quadruple;
//# sourceMappingURL=Quadruple.js.map