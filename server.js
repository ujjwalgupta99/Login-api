const http = require('http')
// const https = require('https')
const path = require('path')

const fs = require("fs");

global.appRoot = path.resolve(__dirname)
// Enabling SSL to listen on port

// var privateKey = fs.readFileSync(appRoot + '/api/certs/privkey.pem').toString();

// var certificate = fs.readFileSync(appRoot + '/api/certs/cert.pem').toString();

// var ssl_credentials = { key: privateKey, cert: certificate };

const app = require('./app')
const port = normalizePort(process.env.PORT || 4000)
//app.set('port', port)
//var d=app.getDateTime();
const server = http.createServer(app)
// const server = https.createServer(ssl_credentials,app)
/*
 * Listen on provided port, on all network interfaces.
 */
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  console.error('testing')
  if (error.syscall !== 'listen') {
    throw error
  }
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  console.error('Listening on ' + bind)
}

function normalizePort(val) {
  var port = parseInt(val, 10)
  if (isNaN(port)) {
    // named pipe
    return val
  }
  if (port >= 0) {
    // port number
    return port
  }
  return false
}