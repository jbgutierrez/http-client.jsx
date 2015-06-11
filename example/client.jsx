#target "photoshop"
#include "../lib/http-client.full.jsx"

(function() {

    function log(title) {
      return function (response) {
        $.writeln(title);
        $.writeln("\tStatusCode:    " + response.statusCode);
        $.writeln("\tStatusMessage: " + response.statusMessage);
        $.writeln("\tHeaders:       " + response.headers);
        $.writeln("\tBody:          " + response.body.substring(0, 15));
        $.writeln("\tBody length:   " + response.body.length);
      };
    }

    var client, body, options;

    options = { port: 4567, timeout: 1, encoding: 'utf8', headers: { "X-Auth-Token": "secret" } };
    client = new HttpClient('localhost', options);

    // 200 - GET
    options = {
        uri: '/?foo=hello&bar=world',
        headers: { FOO: 'BAR' }
    };
    client.get(options, log("GET /"));

    // 200 - GET (UTF8)
    client.get('/echo?utf8=%C3%A1%C3%AB%C3%B1%E2%82%AC', log("GET /echo?utf8=áëñ€"));

    // 200 - GET (Large body)
    client.get('/10000-stars', log("GET /10000-stars"));

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
