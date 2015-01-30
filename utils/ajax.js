var get = function(url, cb) {
  var req = false;

  // XDomainRequest onload
  var oldIE = function () {
    cb(null, JSON.parse(req.responseText));
  };

  // XMLHttpRequest onload
  var onLoad = function () {
    if (req.readyState !== 4) return;
    if (req.status === 200) cb(null, JSON.parse(req.responseText));
    else {
      cb({ error: 'Sorry, an error ocurred on the server' }, null);
    }
  };

  var onError = function() {
    cb({ error: 'Problem with your internet conection' }, null);
  };

  try {
    req = new XDomainRequest();
    req.onload = oldIE;
  }
  catch (e) {
    req = new XMLHttpRequest();
    req.onreadystatechange = onLoad;
  }

  req.onerror = onError;
  req.open('GET', url, true);
  req.send();
};

module.exports = { get: get };
