"use strict";


const EmptyCartException = require("./EmptyCartException.js");
const UpdateCartException = require("./UpdateCartException.js");
module.exports = class Cart {

    #items;

    constructor(items) {

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
        let sum = 0;

        this.#items.forEach(calculateTotal);

        function calculateTotal(item) {

            sum += item.price * item.quantity;
        }

        return sum;
    }

    count(sumTotal) {

        if (this.#items == null) {

            throw new EmptyCartException();

        }
        let sum = 0;


        this.#items.forEach(calculateTotal);

        function calculateTotal(item) {

            if (sumTotal) {
                sum += 1;
            } else {
                sum += item.quantity;
            }
        }


        return sum;
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