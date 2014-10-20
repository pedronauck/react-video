var get = function(url, cb) {
  var req = new XMLHttpRequest();

  req.open('GET', url, true);
  req.onload = function() {
    if (req.status === 200 && req.status < 400) {
      cb(null, JSON.parse(req.responseText));
    }
    else {
      cb({ error: 'Sorry, an error ocurred on the server' }, null);
    }
  };

  req.onerror = function() {
    cb({ error: 'Problem with your internet conection' }, null);
  };

  req.send();
};

module.exports = { get: get };
