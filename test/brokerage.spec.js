const Brokerage = require('../lib/brokerage');
const Client = require('../lib/client');
const expect = require('chai').expect;

describe('Brokerage', () => {
  describe('constructor', () => {
    it('should construct a new Brokerage object', () => {
      const b1 = new Brokerage('Etrade');
      expect(b1.name).to.equal('Etrade');
      expect(b1.clients).to.be.length(0);
    });
  });
  describe('#addClient', () => {
    it('should add a new Client entity to the brokerage', () => {
      const b1 = new Brokerage('Etrade');
      const c1 = new Client('Billy Joe Bob');
      b1.addClient(c1);
      expect(b1.clients).to.be.length(1);
      expect(b1.position()).to.equal(0);
    });
    it('should fail to add a new, non-Client entity', () => {
      const b1 = new Brokerage('Etrade');
      b1.addClient({ name: 'invalid' });
      expect(b1.clients).to.be.length(0);
      expect(b1.position()).to.equal(0);
    });
  });
});
