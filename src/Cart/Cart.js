"use strict";

const EmptyCartException = require("./EmptyCartException.js");
const UpdateCartException = require("./UpdateCartException.js");
const MultipleCurrenciesException = require("./MultipleCurrenciesException.js");
module.exports = class Cart {
  #items;
  #currency;
  constructor(items, currency = "CHF") {

    this.#currency = currency;
    this.#items = items;
    if (this.items.length) {
      this.#currency = items[0].currency
      if(this.items.length > 1) {
        if (items[1].currency !== items[0].currency) {
          throw new MultipleCurrenciesException();
        }
      }
      //doesn't work, code get's executed even if the array is empty
      //this.#items.forEach(this.checkMultipleCurrencies);
    }



  }

  checkMultipleCurrencies(item){

    if(item.currency !== Cart.#currency){
      throw new MultipleCurrenciesException();
    }


  }
  get items() {
    if(this.#items == null){
      return [];
    }else {
      return this.#items;
    }
  }

  get total() {
    return this.calculateTotal(this.items, false, true);
  }
  get currency(){
    return this.#currency;
  }
  count(isSum) {
    if (this.#items == null) {
      throw new EmptyCartException();
    }

    return this.calculateTotal(this.items, isSum, false);
  }

  calculateTotal(items, isSum, isTotal) {
    let sum = 0;

    items.forEach(function (item) {
      if (isSum) {
        sum += 1;
      } else if (isTotal) {

        sum += item.price * item.quantity;
      } else {
        sum += item.quantity;
      }
    });
    return sum;
  }

  add(item) {

    if(this.items){
      if(item[0].currency !== this.#currency){

        throw  new MultipleCurrenciesException();
      }
    }
    if (this.#items == null) {
      this.#items = item;
    } else {
      this.#items.push(item);
    }
  }
};