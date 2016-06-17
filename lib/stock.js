/* eslint-disable func-names */
/* eslint-disable consistent-return */
const request = require('request');
function Stock(symbol) {
  this.symbol = symbol.toUpperCase();
}

Stock.prototype.purchase = function (quantity, cb) {
  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${this.symbol}`;
  request({ url, json: true }, (err, rsp, body) => {
    this.purchasePricePerShare = body.LastPrice;
    this.name = body.Name;
    this.shares = quantity;
    this.purchaseDate = new Date();
    const totalPaid = this.shares * this.purchasePricePerShare;
    cb(null, totalPaid);
  });
};

Stock.prototype.sell = function (quantity, cb) {
  if (quantity > this.shares) return cb(new Error('Not enough shares.'));
  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${this.symbol}`;
  request({ url, json: true }, (err, rsp, body) => {
    const sellPrice = body.LastPrice;
    let totalReceived = 0;
    if (quantity <= this.shares) {
      this.shares = this.shares - quantity;
      totalReceived = quantity * sellPrice;
    }
    cb(null, totalReceived);
  });
};

Stock.getQuote = (symbol, cb) => {
  const url = `http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=${symbol}`;
  request({ url, json: true }, (err, rsp, body) => {
    const purchasePrice = body.LastPrice;
    cb(null, purchasePrice);
  });
};

module.exports = Stock;
