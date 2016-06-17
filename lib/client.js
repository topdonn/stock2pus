/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Stock = require('../lib/stock');
function Client(name) {
  this.name = name;
  this.cash = 0;
  this.stocks = [];
}

Client.prototype.deposit = function deposit(amount) {
  this.cash += amount;
};
Client.prototype.withdraw = function withdraw(amount) {
  if (amount > this.cash) return;
  this.cash -= amount;
};
Client.prototype.purchaseStock = function purchaseStock(symbol, quantity, portfolio, cb) {
  Stock.getQuote(symbol, (err, purchasePrice) => {
    let purchaseQuantity = quantity;
    // No cash to even buy 1 share
    if (this.cash < (purchasePrice)) return cb(new Error('Not enough cash.'), 0);
    // We have cash, but not enough for the full quantity. So adjust quantity
    if (this.cash < (purchasePrice * quantity)) purchaseQuantity = Math.floor(this.cash / purchasePrice);
    const s1 = new Stock(symbol);
    s1.purchase(purchaseQuantity, (purchaseErr, totalPaid) => {
      this.withdraw(totalPaid);
      this.stocks.push(s1);
      return cb(null, purchaseQuantity);
    });
  });
};
module.exports = Client;
