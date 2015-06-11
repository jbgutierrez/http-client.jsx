# http-client.jsx

Tiny http client for Photoshop

## Install

### npm

```
$ npm install --save http-client.jsx
```

### bower

```
$ bower install --save http-client.jsx
```

### Download Latest Build

[Download `lib/http-client.full.jsx`](https://raw.githubusercontent.com/jbgutierrez/http-client.jsx/master/lib/http-client.full.jsx)

## Usage

```javascript
#target "photoshop"
#include "node_modules/http-client.jsx/lib/http-client.full.jsx"

var client =
  new HttpClient('localhost', {
    encoding: 'binary',
    port: 80,
    timeout: 10,
    headers: {
      "User-Agent": "Adobe ExtendScript"
    }
  });

var options = { uri: '/', body: "...", headers: { ... } };
client.post(options, function(response) { ... });
```

## API

See `example/client.jsx` for usage samples.

### Class: HttpClient

### client.get(options, callback)

### client.post(options, callback)

### client.put(options, callback)

### client.delete(options, callback)

### client.head(options, callback)

### client.request(verb, options, callback)

### client.close()

## License

MIT © [Javier Blanco](http://jbgutierrez.info)
