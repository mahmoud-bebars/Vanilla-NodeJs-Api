const models = require('../models/productModel')
const fs = require('../utility/fs')
//@desc  Gets All products
//@route GET /api/products
async function getProducts(req, res) {
  try {
    const products = await models.findAll()
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(products))
  } catch (error) {
    console.log(error)
  }
}

//@desc  Gets single product
//@route GET /api/product/:id
async function getProduct(req, res, id) {
  try {
    const product = await models.findById(id)

    if (!product) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Product Not Found' }))
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(product))
    }
  } catch (error) {
    console.log(error)
  }
}

//@desc  Create a Product
//@route POST /api/products
async function createProduct(req, res) {
  try {
    const body = await fs.getPostData(req)

    const { title, description, price } = JSON.parse(body)

    const product = {
      title,
      description,
      price,
    }
    const newProduct = await models.create(product)

    res.writeHead(201, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify(newProduct))
  } catch (error) {
    console.log(error)
  }
}

//@desc  Update a Product
//@route Put /api/products/:id
async function updateProduct(req, res, id) {
  try {
    const product = await models.findById(id)

    if (!product) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Product Not Found' }))
    } else {
      const body = await fs.getPostData(req)

      const { title, description, price } = JSON.parse(body)

      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      }
      const updProduct = await models.update(id, productData)

      res.writeHead(201, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify(updProduct))
    }
  } catch (error) {
    console.log(error)
  }
}

//@desc  Delete product
//@route DELETE /api/product/:id
async function removeProduct(req, res, id) {
  try {
    const product = await models.findById(id)

    if (!product) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'Product Not Found' }))
    } else {
      await models.remove(id)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: `product ${id} removed` }))
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  removeProduct,
}
