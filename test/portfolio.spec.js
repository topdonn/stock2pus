const expect = require('chai').expect;
const Portfolio = require('../lib/portfolio');

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
      p1.addStock({ purchasePricePerShare: 100,
                  name: 'GOOG',
                  shares: 100 });
      expect(p1.stocks).to.be.length(1);
    });
  });
  describe('#position', () => {
    it('should check total value of all stocks in Portfolio', () => {
      const p1 = new Portfolio('Tech');
      p1.addStock({ purchasePricePerShare: 100,
                  name: 'GOOG',
                  shares: 100 });
      p1.addStock({ purchasePricePerShare: 50,
                  name: 'APPL',
                  shares: 100 });
      expect(p1.position()).to.equal(15000);
    });
    it('should return zero since we have no stocks in Portfolio', () => {
      const p1 = new Portfolio('Tech');
      expect(p1.position()).to.equal(0);
    });
  });
});
