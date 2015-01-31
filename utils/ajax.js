exports.get = function(opts) {
  var url = opts.url;
  var successCb = opts.onSuccess;
  var errorCb = opts.onError;
  var req = false;

  // XDomainRequest onload
  var _oldIE = function () {
    successCb(null, JSON.parse(req.responseText));
  };

  // XMLHttpRequest onload
  var _onLoad = function () {
    if (req.readyState !== 4) return;
    if (req.status === 200) successCb(null, JSON.parse(req.responseText));
    else {
      var err = { error: 'Sorry, an error ocurred on the server' };

      if (errorCb && typeof errorCb === 'function') return errorCb(err);
      successCb(err, null);
    }
  };

  var _onError = function() {
    var err = { error: 'Sorry, an error ocurred on the server' };

    if (errorCb && typeof errorCb === 'function') return errorCb(err);
    successCb(err, null);
  };

  try {
    req = new XDomainRequest();
    req.onload = _oldIE;
  }
  catch (e) {
    req = new XMLHttpRequest();
    req.onreadystatechange = _onLoad;
  }

  req.onerror = _onError;
  req.open('GET', url, true);
  req.send();
};
