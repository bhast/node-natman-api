var natman = require('./lib/natman');

module.exports = function (privatePort, publicPort) {
  return natman.createNat({private: privatePort, public: publicPort});
};
