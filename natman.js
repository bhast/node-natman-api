var natman = require('./lib/natman');

module.exports = function (privatePort, publicPort, protocol, callback) {
  natman.createNat({
    private: privatePort,
    public: publicPort,
    protocol: protocol
  }, callback);
};
