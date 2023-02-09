"use strict";


const EmptyCartException = require("./EmptyCartException.js");
const UpdateCartException = require("./UpdateCartException.js");
module.exports = class Cart {

    #items;

    constructor(items) {

        //forced to do so because of total_EmptyCart_ThrowException test
        this.#items = items;

    }

    get items() {
        if (this.#items == null) {

            throw new EmptyCartException();

        }

        return this.#items;
    }

    get total() {
        if (this.#items == null) {

            throw new EmptyCartException();

        }
        return this.calculateTotal(this.#items, false, true);
    }

    count(isSum) {

        if (this.#items == null) {

            throw new EmptyCartException();

        }


        return this.calculateTotal(this.#items, isSum, false);
    }

    calculateTotal(items, isSum, isTotal) {
        let sum = 0

        items.forEach(function (item) {
            if (isSum) {
                sum += 1;
            } else if (isTotal) {
                sum += item.price * item.quantity;
            } else {
                sum += item.quantity;

            }

        });
        return sum
    }

    add(item) {

        if (item == null) {

            throw new UpdateCartException();

        }
        if (this.#items == null) {

            this.#items = item;

        } else {

            this.#items.push(item);
        }
    }

}