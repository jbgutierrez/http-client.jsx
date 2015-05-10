class @HttpClient
  constructor: (@domain, @options = {}) ->
    defaults =
      encoding: 'binary'
      timeout: 10
      port: 80
      headers:
        "User-Agent": "Adobe ExtendScript"

    for key, value of defaults
      @options[key] ?= value

    @socket = new Socket()
    @socket.timeout = @options.timeout

  open: ->
    return if @socket.connected
    if not @socket.open "#{@domain}:#{@options.port}", @options.encoding
      throw "Couldn't establish a connection"

  close: ->
    return unless @socket.connected
    if not @socket.close()
      throw "Couldn't close the connection"

  request: (verb, uri_or_options={}, callback=->) ->
    @open()

    if typeof uri_or_options == 'string' 
      options = {}
      uri = uri_or_options
    else
      options = uri_or_options
      uri = options.uri or '/'

    options.headers ?= {}
    for key, value of @options.headers
      options.headers[key] ?= value
    options.headers['Content-Length'] = options.body.length if options.body

    msg = "#{verb} #{uri} HTTP/1.1\r\n"
    for header, value of options.headers
      msg += "#{header}: #{value}\r\n"
    msg += "\r\n"
    msg += "#{options.body}" if options.body

    @socket.write msg

    line = @socket.readln()
    throw "Timeout" unless line
    [version, statusCode, statusMessage...] = line.split ' '
    statusMessage = statusMessage.join ' '
    headers = {}
    while not /^\n/.test (line = @socket.readln())
      [key, value...] = line.split ':'
      headers[key] = value.join ':'
    body = line.substring 1

    response = {
      statusCode: +statusCode
      statusMessage: statusMessage
      headers: headers
      body: body
    }

    callback response
    response

  get: (uri_or_options, callback) -> @request "GET", uri_or_options, callback
  post: (uri_or_options, callback) -> @request "POST", uri_or_options, callback
  put: (uri_or_options, callback) -> @request "PUT", uri_or_options, callback
  delete: (uri_or_options, callback) -> @request "DELETE", uri_or_options, callback
  head: (uri_or_options, callback) -> @request "HEAD", uri_or_options, callback
