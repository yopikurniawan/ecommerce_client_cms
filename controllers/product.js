const {Product} = require('../models')

class ProductController {
  static async create (req, res, next) {
    try {
      const {name, image_url, price, stock} = req.body
      const product = await Product.create({name, image_url, price, stock})
      res.status(201).json(product)
    } catch (error) {
      next(error)
    }
  }

  static async show (req, res, next) {
    try {
      const products = await Product.findAll()
      res.status(200).json({products})
    } catch (error) {
      next(error)
    }
  }

  static async getOne (req, res, next) {
    try {
      const id = +req.params.id
      const product = await Product.findByPk(id)

      if (product) res.status(200).json(product)
      else throw ({statusCode: 404, message: 'Product not found'})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductController