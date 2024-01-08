'use strict'

const http = require('http')
const fs = require('fs')

const port = process.env.APP_PORT || 8080
const host = process.env.APP_HOST || 'localhost'

function serveStaticFile(res, path, contentType, statusCode = 200) {
  fs.readFile(__dirname + path, function(err, data) {
    if(err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' })
      return res.end('500 Internal Server Error')
    }

    res.writeHead(statusCode, { 'Content-Type': contentType })
    res.end(data)
  })
}

const server = http.createServer(function(req, res) {
  const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()

  // normalize url removing query string and trailing slash
  switch(path) {
    case '':
      serveStaticFile(res, '/public/index.html', 'text/html', 200)
      break
    case '/about':
      serveStaticFile(res, '/public/about.html', 'text/html', 200)
      break
    case '/images/logo.png':
      serveStaticFile(res, '/public/images/logo.png', 'image/png', 200)
      break
    default:
      serveStaticFile(res, '/public/404.html', 'text/html', 404)
  }
})

server.listen(port, host, function() {
  console.log(`Server listening on http://${host}:${port}`)
})
