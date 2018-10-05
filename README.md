# ipfs-play

helps save and load game data and hiscores into ipfs. I made this intending to use it during the next [ludum dare](https://ludumdare.com/compo) game jam.

uses the [ipfs api](https://www.npmjs.com/package/ipfs-api) by wrapping `ipfs.add`.


## Installation

`npm install`

make sure you have an IPFS daemon running locally, or use these environment variables to set the location of your IPFS daemon (API must be enabled and accessible)

Available environment variables:
```
ipfs_daemon_host
ipfs_daemon_port
ipfs_daemon_protocol
```


## Usage

**See example dir for more detailed and commented code**

Save game data to IPFS
```javascript
var ipfsPlay = require('ipfsPlay');

var saveData = {"level": 5};
ipfsPlay.save(saveData, function(err, key) {
  if (err) return console.error(err);
  // key => QmPJQv5888kUNFXLvr8duLu9De6sgGog896jBGYnBWk6f1
  
  console.log('your game is saved! To load your game later, use the key ' + key);
  
}
```

Load game data from IPFS
```javascript
var key = 'QmPJQv5888kUNFXLvr8duLu9De6sgGog896jBGYnBWk6f1';
ipfsPlay.load(key, function (err, gameData) {

  if (err) return console.error('problem loading! ' + err);

  var level = gameData.level;

  console.log('Welcome back, player. you are on level ' + level);

});
```

see example directory for more detail and commented code

## Future ideas

* [ ] Handle errors better. Differentiate types of errors
  * [ ] add error type where ipfs-play can't connect to ipfs daemon
  * [ ] add error type where ipfs-play couldn't find the save key
  * [ ] add error type where ipfs-play didn't get valid saveData using the key

## Feedback

If you have used and enjoy this code base, I'd love to hear from you!

[![Say Thanks!](https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg)](https://saythanks.io/to/insanity54) [![Greenkeeper badge](https://badges.greenkeeper.io/insanity54/ipfs-play.svg)](https://greenkeeper.io/)
