var natman = require('./lib/natman');

module.exports = function (privatePort, publicPort, protocol) {
  return natman.createNat({
    private: privatePort,
    public: publicPort,
    protocol: protocol
  });
};
