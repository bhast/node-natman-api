var natpmp = require('nat-pmp'),
    natupnp = require('nat-upnp'),
    network = require('network'),
    os = require('os'),
    natman = exports;

var Nat = exports.Nat = function (options) {
  this.clients = {
    pmp: natpmp.connect(options.gateway),
    upnp: natupnp.createClient()
  };
  return this;
}

natman.createNat = function (options, callback) {
  network.get_gateway_ip(function (err, gateway) {
    if (err) console.warn(err);
    options = options || {};
    options.gateway = options.gateway || gateway;
    options.private = options.private || 22;
    options.public  = options.public  || 8888;
    options.ttl     = options.ttl     || 3600;
    var nat = new Nat(options);
    nat.open(options);
  });
};

Nat.prototype.open = function (options, callback) {
  this.map(options, callback);
};

Nat.prototype.map = function (options, callback) {
  var self = this;
  callback = callback || function () {};

  function onConnect(client, external) {
    var portInfo = {
      private: options.private,
      public: options.public,
      ttl: client === self.clients.upnp ? 0 : options.ttl
    };
    console.info('Connected to WAN address: ' +
                 external)
    console.warn('Mapping ' + external +
                 ':' + options.public +
                 ' => ' + 'localhost:' +
                 options.private);

    return client.portMapping(portInfo, function(err, info){
      if(err) {
        console.error(err);
        return callback(err);
      }

      // UPNP Returns server's response in info object
      if (!info.public) info = options;

      process.once('SIGINT', function() {
        client.portUnmapping(portInfo, function() {
          // Ignore errors for now
          process.exit(0);
        });
      });

      return callback(err, info);
    });
  }

  var once = false,
      waiting = Object.keys(this.clients).length;

  Object.keys(this.clients).forEach(function(key) {
    var client = self.clients[key];

    client.externalIp(function(err, external) {
      waiting--;
      if(once) return;

      // Ignore errors if we have reserve choices
      if(err && waiting > 0) return;

      // Invoke callback only once
      once = true;

      if(err) {
        console.error(err);
        return callback(err);
      }

      if (typeof external === 'string') {
        onConnect(client, external);
      } else {
        onConnect(client, external.ip.join('.'));
      }
    });
  });
};
