var path = require('path');
var ipfsPlay = require(path.join(__dirname, '..', 'index'));



// example of your game creating a high score
var highscore = Math.floor(Math.random()*(9001-1+1)+1);


// highscore gets put in JSON along with any other data you want
var saveData = {
  "game": "Tetris EXTREEME 9001",
  "player_name": "Ashton Kutcher",
  "high_score": highscore,
  "current_level": 3
}



// the game data is stored in IPFS
ipfsPlay.save(saveData, function(err, key) {
  // once saved, you are given a unique key which is mapped to the save data in ipfs.
  // the key can be given to the player to retrieve their saved game at a later date, or show off their high scores to their friends.
  // the key is simply an IPFS hash. (more about that here: https://ipfs.io/docs/getting-started/)
  
  if (err) return console.error(err) // handle the error if there was a problem saving to IPFS
  
  console.log('your game is saved! To load your game later, use the key ' + key);
  
}
              
              
