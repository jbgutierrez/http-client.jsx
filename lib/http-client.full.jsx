(function() {
  var slice = [].slice;

  this.HttpClient = (function() {
    function HttpClient(domain, options1) {
      var base, defaults, key, value;
      this.domain = domain;
      this.options = options1 != null ? options1 : {};
      defaults = {
        encoding: 'binary',
        timeout: 10,
        port: 80,
        headers: {
          "User-Agent": "Adobe ExtendScript"
        }
      };
      for (key in defaults) {
        value = defaults[key];
        if ((base = this.options)[key] == null) {
          base[key] = value;
        }
      }
      this.socket = new Socket();
      this.socket.timeout = this.options.timeout;
    }

    HttpClient.prototype.open = function() {
      if (this.socket.connected) {
        return;
      }
      if (!this.socket.open(this.domain + ":" + this.options.port, this.options.encoding)) {
        throw "Couldn't establish a connection";
      }
    };

    HttpClient.prototype.close = function() {
      if (!this.socket.connected) {
        return;
      }
      if (!this.socket.close()) {
        throw "Couldn't close the connection";
      }
    };

    HttpClient.prototype.request = function(verb, uri_or_options, callback) {
      var base, body, header, headers, key, line, msg, options, ref, ref1, ref2, ref3, response, statusCode, statusMessage, uri, value, version;
      if (uri_or_options == null) {
        uri_or_options = {};
      }
      if (callback == null) {
        callback = function() {};
      }
      this.open();
      if (typeof uri_or_options === 'string') {
        options = {};
        uri = uri_or_options;
      } else {
        options = uri_or_options;
        uri = options.uri || '/';
      }
      if (options.headers == null) {
        options.headers = {};
      }
      ref = this.options.headers;
      for (key in ref) {
        value = ref[key];
        if ((base = options.headers)[key] == null) {
          base[key] = value;
        }
      }
      if (options.body) {
        options.headers['Content-Length'] = options.body.length;
      }
      msg = verb + " " + uri + " HTTP/1.1\r\n";
      ref1 = options.headers;
      for (header in ref1) {
        value = ref1[header];
        msg += header + ": " + value + "\r\n";
      }
      msg += "\r\n";
      if (options.body) {
        msg += "" + options.body;
      }
      this.socket.write(msg);
      line = this.socket.readln();
      if (!line) {
        throw "Timeout";
      }
      ref2 = line.split(' '), version = ref2[0], statusCode = ref2[1], statusMessage = 3 <= ref2.length ? slice.call(ref2, 2) : [];
      statusMessage = statusMessage.join(' ');
      headers = {};
      while (!/^\n/.test(line = this.socket.readln())) {
        ref3 = line.split(':'), key = ref3[0], value = 2 <= ref3.length ? slice.call(ref3, 1) : [];
        headers[key] = value.join(':');
      }
      body = line.substring(1);
      while (line = this.socket.readln()) {
        body += line;
      }
      response = {
        statusCode: +statusCode,
        statusMessage: statusMessage,
        headers: headers,
        body: body
      };
      callback(response);
      return response;
    };

    HttpClient.prototype.get = function(uri_or_options, callback) {
      return this.request("GET", uri_or_options, callback);
    };

    HttpClient.prototype.post = function(uri_or_options, callback) {
      return this.request("POST", uri_or_options, callback);
    };

    HttpClient.prototype.put = function(uri_or_options, callback) {
      return this.request("PUT", uri_or_options, callback);
    };

    HttpClient.prototype["delete"] = function(uri_or_options, callback) {
      return this.request("DELETE", uri_or_options, callback);
    };

    HttpClient.prototype.head = function(uri_or_options, callback) {
      return this.request("HEAD", uri_or_options, callback);
    };

    return HttpClient;

  })();

}).call(this);
