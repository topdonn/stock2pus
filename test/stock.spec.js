/* eslint-disable no-unused-expressions */

const expect = require('chai').expect;
const Stock = require('../lib/stock');
const nock = require('nock');
const sinon = require('sinon');
let clock;

describe('Stock', () => {
  beforeEach(() => {
    clock = sinon.useFakeTimers();
    nock('http://dev.markitondemand.com')
    .get('/MODApis/Api/v2/Quote/json?symbol=AAPL')
    .reply(200, {
      Name: 'Apple',
      LastPrice: 100,
    });
  });
  after(() => {
    nock.restore();
  });
  describe('.getQuote', () => {
    it('should return purchase price of a stock', (done) => {
      Stock.getQuote('AAPL', (err, purchasePrice) => {
        expect(purchasePrice).to.equal(100);
        done();
      });
    });
  });
  describe('constructor', () => {
    it('should construct a new Stock object', () => {
      const s1 = new Stock('aapl');
      expect(s1.symbol).to.equal('AAPL');
    });
  });
  describe('#purchase', () => {
    it('should purchase stock', (done) => {
      const s1 = new Stock('aapl');
      clock.tick(150);
      s1.purchase(50, (err, totalPaid) => {
        expect(err).to.be.null;
        expect(totalPaid).to.be.equal(5000);
        expect(s1.shares).to.equal(50);
        expect(s1.purchaseDate.getTime()).to.equal(150);
        expect(s1.name).to.equal('Apple');
        expect(s1.purchasePricePerShare).to.equal(100);
        done();
      });
    });
  });

  describe('#sell', () => {
    it('should sell stock', (done) => {
      const s1 = new Stock('aapl');
      clock.tick(150);
      s1.purchase(50, (err, totalPaid) => {
        expect(err).to.be.null;
        expect(totalPaid).to.be.equal(5000);
        expect(s1.shares).to.equal(50);
        expect(s1.purchaseDate.getTime()).to.equal(150);
        expect(s1.name).to.equal('Apple');
        expect(s1.purchasePricePerShare).to.equal(100);
        s1.sell(10, (errSell, totalReceived) => {
          expect(errSell).to.be.null;
          expect(totalReceived).to.be.gt(0);
        });
        done();
      });
    });
    it('should not sell due to insufficient shares', (done) => {
      const s1 = new Stock('aapl');
      clock.tick(150);
      s1.purchase(50, (err, totalPaid) => {
        expect(err).to.be.null;
        expect(totalPaid).to.be.equal(5000);
        expect(s1.shares).to.equal(50);
        expect(s1.purchaseDate.getTime()).to.equal(150);
        expect(s1.name).to.equal('Apple');
        expect(s1.purchasePricePerShare).to.equal(100);
        s1.sell(100, (errSell) => {
          expect(errSell.message).include('Not enough shares.');
        });
        done();
      });
    });
  });
});
