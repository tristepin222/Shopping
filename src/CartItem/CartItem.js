"use strict";

const InvalidArticleIdException = require("./InvalidArticleIdException.js");
const InvalidQuantityException = require("./InvalidQuantityException.js");
const InvalidPriceException = require("./InvalidPriceException.js");
const InvalidCurrencyException = require("./InvalidCurrencyException.js");
module.exports = class CartItem {
  //region private attributes
  #articleId;
  #name;
  #quantity;
  #price;
  #currency;
  //endregion private attributes

  //region public methods
  constructor(articleId, name, quantity, price = 10, currency = "CHF") {
    if(currency.length < 3){
      throw  new InvalidCurrencyException();
    }
    if (articleId < 0) {
      throw new InvalidArticleIdException();
    }

    this.#articleId = articleId;
    this.#name = name;
    this.#currency = currency;
    this.quantity = quantity;
    this.price = price;
  }

  get articleId() {
    return this.#articleId;
  }

  get name() {
    return this.#name;
  }

  get quantity() {
    return this.#quantity;
  }

  set quantity(value) {
    if (value < 0) {
      throw new InvalidQuantityException();
    }

    this.#quantity = value;
  }

  get price() {
    return this.#price;
  }

  set price(value) {
    if (value < 10) {
      throw new InvalidPriceException();
    }
    this.#price = value;
  }


  get currency(){
    return this.#currency;
  }

  get total() {
    return this.#price * this.#quantity;
  }
  //endregion public methods

  //region private methods
  //endregion private methods
};
