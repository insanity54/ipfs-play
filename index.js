var ipfsAPI = require('ipfs-api')
var nconf = require('nconf');

// see if ipfs connection settings were configured in environment variables
nconf.env(
  'ipfs_daemon_host',
  'ipfs_daemon_port',
  'ipfs_daemon_protocol'
);

var ipfsDaemonHost;
var ipfsDaemonPort;
var ipfsDaemonProtocol;
var options;
var ipfs;

ipfsDaemonHost = nconf.get('ipfs_daemon_host');
ipfsDaemonPort = nconf.get('ipfs_daemon_port');
ipfsDaemonProtocol = nconf.get('ipfs_daemon_protocol');


if (typeof (ipfsDaemonHost) !== 'undefined') {
  // connect to ipfs daemon API server with configured values
  options = {
    host: ipfsDaemonHost,
    port: ipfsDaemonPort,
    protocol: ipfsDaemonProtocol
  };

} else {
  // connect to ipfs daemon API server with defaults
  options = {
    host: 'localhost',
    port: '5001',
    protocol: 'http'
  }
}

ipfs = ipfsAPI(options);






function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}





/**
 * save
 *
 * saves game data to IPFS
 *
 * @param {JSON} data - game data to save
 * @pram {onSavedCallback}
 */
var save = function save(data, cb) {

    // make sure data we got was JSON
    if (!isJson(data)) {
      console.log(data);
      var e = new Error('save data was not JSON');
      console.error(e);
      return cb(e);
    }


    ipfs.add(new Buffer(data), function (err, res) {
      if (err) {
        console.error(err);
        console.error(res);
        return cb(err);
      }

      //console.log('added to ipfs without issue');
      console.log(res);

      // @todo return to cb
      return cb(null, res[0].Hash);
    });
  }
  /**
   * onSavedCallback
   *
   * @callback {onSavedCallback}
   * @param {error} err
   * @param {string} hash - the IPFS hash address to the saved data
   */




/**
 * load
 *
 * loads game save data from ipfs
 *
 * @param {string} key - the key to the game data (an ipfs hash)
 * @param {onLoadedCallback} cb
 */
var load = function load(key, cb) {
    //console.log('loading');
    //console.log(key);
    // @todo make sure we're just getting one hash and not a list of hashes


    ipfs.cat(key, function (err, res) {
      if (err) {
        var e = new Error('could not load save data from ipfs');
        console.error(e);
        return cb(e);
      }

      if (res.readable) {
        console.log('piping');
        
        var string = ''
        res.on('readable', function () {
          var part = res.read(); //.toString();
          string += part;
          //console.log('stream data ' + part);
        });


        res.on('end', function () {
          //console.log('final output ' + string);
          return cb(null, string);
        });

      } else {
        //console.log('logging');
        return cb(null, res);
      }

    });

  }
  /**
   * onLoadedCallback
   *
   * @callback {onLoadedCallback}
   * @param {error} err
   * @param {JSON} data - game save data 
   */




module.exports = {
  save: save,
  load: load
}