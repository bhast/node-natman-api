# node-natman-api-udp

This was the only UPNP/PMP project on Github that would work for me when using with an Electron App. Support added for UDP protocol port mapping.

node-natman-api-udp is a simple api wrapper made by [`96AA48`](https://github.com/96AA48) for the npm package [`natman`](https://www.npmjs.org/package/natman) by [Marak](https://github.com/Marak/). All props should go to him, I just made it reusable as an API.

I ran into a problem working on a project of mine: I wanted the user to be able to port forward without going into their router. This proved to be more difficult than I had thought, since that most PMP or UPNP packages were either crappy or based on native modules that would make compiling with NW.js or Electron really hard. So I came across `natman` a cli utility that actually worked and had a strong codebase. I just removed the cli bit and made it into an API. I also removed [`netroute`](https://npmjs.org/package/netroute) as it would require building of native modules. [`network`](https://npmjs.org/package/network) has been used instead.

### Installation

```
npm install natman-api-udp  
```

## Usage
```javascript
var natman = require('natman-api-udp');

var privatePort = 9871; //The port on your machine that you want to forward
var publicPort = 9871;  //The port you want to open to the rest of the world.
var protocol = 'UDP';   //The protocol you want to open with can be 'UDP' or 'TCP' (default)

natman(privatePort, publicPort, protocol, function(err, info){
  if (err) {
    console.error(err);
  }
  console.log(info);
});
```

### License

[Marak](https://github.com/Marak)'s repo didn't specify any `LICENSE` but his npm package did, so this repo includes a `LICENSE` attributed to him.
