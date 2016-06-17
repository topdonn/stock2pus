const Client = require('../lib/client');
const expect = require('chai').expect;
const nock = require('nock');

describe('Client', () => {
  before(() => {
    nock('http://dev.markitondemand.com')
    .persist()
    .get('/MODApis/Api/v2/Quote/json?symbol=AAPL')
    .reply(200, {
      Name: 'Apple',
      LastPrice: 100,
    });
  });
  after(() => {
    nock.cleanAll();
  });
  describe('constructor', () => {
    it('should construct a new Client object', () => {
      const c1 = new Client('Billy Joe Bob');
      expect(c1.name).to.equal('Billy Joe Bob');
    });
  });
  describe('#deposit', () => {
    it('should increase client cash', () => {
      const c1 = new Client('Billy Joe Bob');
      c1.deposit(500);
      expect(c1.cash).to.equal(500);
    });
  });
  describe('#withdraw', () => {
    it('should withdraw cash', () => {
      const c1 = new Client('Billy Joe Bob');
      c1.deposit(500);
      c1.withdraw(400);
      expect(c1.cash).to.equal(100);
    });
    it('should fail to withdraw cash due to insufficient funds', () => {
      const c1 = new Client('Billy Joe Bob');
      c1.withdraw(400);
      expect(c1.cash).to.equal(0);
    });
  });
  describe('#purchaseStock', () => {
    it('should not purchase stock due to insufficent funds', (done) => {
      const c1 = new Client('Billy Joe Bob');
      c1.deposit(0);
      c1.purchaseStock('AAPL', 20, 'Tech', ((err) => {
        expect(c1.stocks).to.be.length(0);
        expect(err.message).to.equal('Not enough cash.');
        done();
      }));
    });
    it('should purchase stock', (done) => {
      const c1 = new Client('Billy Joe Bob');
      c1.deposit(500);
      c1.purchaseStock('AAPL', 20, 'Tech', ((err, quantityPurchased) => {
        expect(quantityPurchased).to.equal(5);
        expect(c1.stocks).to.be.length(1);
        expect(c1.cash).to.be.equal(0);
        done();
      }));
    });
  });
});
