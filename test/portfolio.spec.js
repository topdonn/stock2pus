const expect = require('chai').expect;
const Portfolio = require('../lib/portfolio');
const Stock = require('../lib/stock');

describe('Portfolio', () => {
  describe('constructor', () => {
    it('should construct a new Portfolio object', () => {
      const p1 = new Portfolio('Tech');
      expect(p1.name).to.equal('Tech');
    });
  });
  describe('#addstock', () => {
    it('should add stock to a Portfolio object', () => {
      const p1 = new Portfolio('Tech');
      const s1 = new Stock('GOOG');
      s1.shares = 100;
      s1.purchasePricePerShare = 100;
      p1.addStock(s1);
      expect(p1.stocks).to.be.length(1);
    });
  });
  describe('#position', () => {
    it('should check total value of all stocks in Portfolio', () => {
      const p1 = new Portfolio('Tech');
      const s1 = new Stock('GOOG');
      s1.shares = 100;
      s1.purchasePricePerShare = 100;
      const s2 = new Stock('APPL');
      s2.shares = 50;
      s2.purchasePricePerShare = 100;
      p1.addStock(s1);
      p1.addStock(s2);
      expect(p1.position()).to.equal(15000);
    });
    it('should return zero since we have no stocks in Portfolio', () => {
      const p1 = new Portfolio('Tech');
      expect(p1.position()).to.equal(0);
    });
    it('should fail due to an invalid stock entity', () => {
      const p1 = new Portfolio('Tech');
      p1.addStock({ bogus: true });
      expect(p1.position()).to.equal(0);
    });
  });
});
