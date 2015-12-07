var path = require('path');
var main = require(path.join(__dirname, 'index.js'));
var assert = require('chai').assert;


describe('main', function() {
  it('should save json in ipfs', function(done) {
    main.save({ "hello": "world", "from": "ipfs-play" }, function(err, hash) {
      assert.isNull(err);
      assert.matches(hash, /[a-zA-Z0-9]{46}/);
  });
  
  it('should load json from ipfs', function(done) {
    
  });
});