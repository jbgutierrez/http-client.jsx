#target "photoshop"
#include "../lib/http-client.full.jsx"

(function() {

    function log(title) {
      return function (response) {
        $.writeln(title);
        $.writeln("\tStatusCode:    " + response.statusCode);
        $.writeln("\tStatusMessage: " + response.statusMessage);
        $.writeln("\tHeaders:       " + response.headers);
        $.writeln("\tBody:          " + response.body.substring(0, 10));
      };
    }

    var client, body, options;

    options = { port: 4567, timeout: 1, headers: { "X-Auth-Token": "secret" } };
    client = new HttpClient('localhost', options);

    // 200 - GET
    options = {
        uri: '/?foo=hello&bar=world',
        headers: { FOO: 'BAR' }
    };
    client.get(options, log("GET /"));

    // 200 - POST x-www-form-urlencoded
    options = {
      body: "foo=hello&bar=world",
      headers: { FOO: 'BAR' }
    };
    client.post(options, log("POST /"));

    // 200 - POST json
    options = {
      body: '{ "foo": "hello", "bar": "world" }',
      headers: {
        FOO: 'BAR',
        'Content-Type': 'application/json'
      }
    };
    client.post(options, log("POST /"));

    // 404 - GET
    client.get('/not-found', log("GET /not-found"));

    // Timeout
    try {
        client.get('/timeout');
    } catch(err) {
        $.writeln("GET /timeout ... " + err);
    }

    client.close();

})();
