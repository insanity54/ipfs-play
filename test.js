var path = require('path');
var main = require(path.join(__dirname, 'index.js'));
var assert = require('chai').assert;


function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}






describe('main', function () {

  var persist = '';

  it('should save json in ipfs', function (done) {
    main.save(JSON.stringify({
      "hello": "world",
      "from": "ipfs-play (https://github.com/insanity54/ipfs-play)"
    }), function (err, hash) {
      assert.isNull(err);
      assert.match(hash, /[a-zA-Z0-9]{46}/);
      persist = hash;
      done();
    });
  });

  it('should load json from ipfs', function (done) {
    main.load(persist, function (err, data) {
      assert.isNull(err);
      assert.isNotNull(data);
      assert.isTrue(isJson(data), 'game data retrieved from ipfs is not json');
      console.log(data);
      done();
    });
  });

  it('should successfully cat old hashes', function (done) {
    main.load('QmZd9ayjiEBgJDKHJsLeavCLzCsqnKxQKU2ZGuJwz1SWGq', function (err, data) {
      assert.isNull(err);
      assert.isNotNull(data);
      assert.isTrue(isJson(data), 'game data retrieved from ipfs is not json');
      console.log(data);
      console.log('^ data');
      done();
    });
  });
});