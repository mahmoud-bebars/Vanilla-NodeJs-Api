let products = require('../data/products.json')
const uuid = require('uuid')
const fs = require('../utility/fs')

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products)
  })
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id)
    resolve(product)
  })
}

function create(product) {
  return new Promise((resolve, reject) => {
    const id = uuid.v4()
    const newProduct = { id, ...product }
    products.push(newProduct)
    fs.writeDataToFile('./data/products.json', products)
    resolve(newProduct)
  })
}

function update(id, product) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === id)
    products[index] = { id, ...product }

    fs.writeDataToFile('./data/products.json', products)
    resolve(products[index])
  })
}

function remove(id) {
  return new Promise((resolve, reject) => {
    products = products.filter((p) => p.id !== id)
    fs.writeDataToFile('./data/products.json', products)
    resolve()
  })
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
}
