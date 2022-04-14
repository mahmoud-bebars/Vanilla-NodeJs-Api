const http = require('http')
const controller = require('./controllers/productController')

const server = http.createServer((req, res) => {
  if (req.url === '/api/products' && req.method === 'GET') {
    controller.getProducts(req, res)
  } else if (
    req.url.match(/\api\/products\/([0-9]+)/) &&
    req.method === 'GET'
  ) {
    const id = req.url.split('/')[3]
    controller.getProduct(req, res, id)
  } else if (req.url === '/api/products' && req.method === 'POST') {
    controller.createProduct(req, res)
  } else if (
    req.url.match(/\api\/products\/([0-9]+)/) &&
    req.method === 'PUT'
  ) {
    const id = req.url.split('/')[3]
    controller.updateProduct(req, res, id)
  } else if (
    req.url.match(/\api\/products\/([0-9]+)/) &&
    req.method === 'DELETE'
  ) {
    const id = req.url.split('/')[3]
    controller.removeProduct(req, res, id)
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Route Not Found' }))
  }
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`🚀 server is running on port ${PORT}`)
})
