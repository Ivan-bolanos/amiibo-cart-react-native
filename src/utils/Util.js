class Util {
    /**
     * Generates a random integer between min (inclusive) and max (exclusive)
     * @param {number} min - The minimum value (inclusive)
     * @param {number} max - The maximum value (exclusive)
     * @returns {number} Random integer
     */
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /**
     * Rounds a number up to the nearest multiple of 10
     * @param {number} x - The number to round
     * @returns {number} Rounded number
     */
    round10(x) {
        return Math.ceil(x / 10) * 10;
    }

    /**
     * Generates a random price between 1000 and 100000, rounded to nearest 10
     * @returns {number} Random price
     */
    getNumberRandomRound10() {
        return this.round10(this.getRandomInt(1000, 100000));
    }

    /**
     * Checks if a value is defined and not empty
     * @param {*} str - The value to check
     * @returns {boolean} True if value exists, false otherwise
     */
    hasValue(str) {
        if (typeof str === 'number') {
            return true;
        }
        if (str === undefined || str === null || str === '') {
            return false;
        }
        return true;
    }

    /**
     * Calculates the total price of items in the shopping cart
     * @param {Array} cart - Array of cart items
     * @returns {number} Total price
     */
    calculateCartTotal(cart) {
        return cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    }

    /**
     * Calculates the total number of items in the cart
     * @param {Array} cart - Array of cart items
     * @returns {number} Total quantity
     */
    calculateCartItemCount(cart) {
        return cart.reduce((count, item) => count + item.quantity, 0);
    }
}

export default new Util();
