const Client = require('../lib/client');
function Brokerage(name) {
  this.name = name;
  this.clients = [];
}

Brokerage.prototype.addClient = function addClient(client) {
  if (!(client instanceof Client)) return;
  this.clients.push(client);
};
Brokerage.prototype.position = function position() {
  return 0;
};

module.exports = Brokerage;
