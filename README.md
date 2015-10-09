# node-natman-api

node-natman-api is a simple api wrapper for the npm package [`natman`](https://www.npmjs.org/package/natman) by [Marak](https://github.com/Marak/). All props should go to him, I just made it reusable as an API.

I ran into a problem working on a project of mine: I wanted the user to be able to port forward without going into their router. This proved to be more difficult than I had thought, since that most PMP or UPNP packages were either crappy or based on native modules that would make compiling with NW.js or Electron really hard. So I came across `natman` a cli utility that actually worked and had a strong codebase. I just removed the cli bit and made it into an API. I also removed [`netroute`](https://npmjs.org/package/netroute) as it would require building of native modules. [`network`](https://npmjs.org/package/network) has been used instead.

### Installation

```
npm install natman-api  
```

## Usage
```javascript
var natman = require('natman-api');

var privatePort = 8080; //The port on your machine that you want to forward
var publicPort = 80 //The port you want to open to the rest of the world.

natman(privatePort, publicPort);
```

### License

[Marak](https://github.com/Marak)'s repo didn't specify any `LICENSE` but his npm package did, so this repo includes a `LICENSE` attributed to him.
