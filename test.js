var testport = 9648;

require('http').createServer(function (req, res) {
  res.end('Hello world!');
}).listen(testport);

require('./natman')(testport, testport);
