# http-client.jsx

Tiny http client for Photoshop

## Usage

```javascript
#target "photoshop"
#include "http-client.full.jsx"

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
