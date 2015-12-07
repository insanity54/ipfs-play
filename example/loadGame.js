var path = require('path');
var ipfsPlay = require(path.join(__dirname, '..', 'index'));



// say the player wants to load their game they previously saved.
// the player would enter their save key into your game's GUI

ipfsPlay.load(key, function (err, gameData) {

  // the game data is loaded from IPFS.
  // if there is a problem loading, hande it (can't connect to IPFS daemon, IPFS can't find find that hash, etc.)
  if (err) return console.error('problem loading! ' + err);

  // game data is now loaded and available to the game GUI
  // this of course depends on how you save the data in the first place (see ./saveGame.js for how I did it)
  var highscore = gameData.high_score;
  var playerName = gameData.player_name;
  var level = gameData.current_level;

  console.log('Welcome back, ' + playerName + '. Loading your last level played, level ' + level + '. Your highscore last time was ' + highscore);

});