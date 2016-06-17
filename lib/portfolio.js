/* eslint-disable func-names */
function Portfolio(name) {
  this.name = name;
  this.stocks = [];
}

Portfolio.prototype.addStock = function (stock) {
  this.stocks.push(stock);
};
module.exports = Portfolio;

Portfolio.prototype.position = function () {
  const totalStocks = this.stocks.map(s => s.shares * s.purchasePricePerShare);
  return totalStocks.reduce((acc, val) => acc + val, 0);
};
