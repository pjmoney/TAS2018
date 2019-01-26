const express = require('express')
const router = require('express-promise-router')()
const { validateBody, schemas } = require('../helpers/productRouteHelpers')
const ProductController = require('../controllers/products')
const passport = require('passport')


const passportJWT = passport.authenticate('jwt', { session: false })

// Add a product
router.route('/')
    .post(validateBody(schemas.addValidProductSchema), ProductController.add)

// Add a particular product review
router.route('/:id')
    .post(validateBody(schemas.addValidReviewSchema),
                            ProductController.addProductReview)

// Get a particular product reviews
router.route('/rew/:id')
    .get(ProductController.getProductReviews)

router.route('/:id')
    .delete(ProductController.removeProductReview),

router.route('/user/:userId')
    .post(ProductController.getByUser)

//Get products by category
router.route('/cat/:category')
    .get(ProductController.getByCategory)
//Get products by id
router.route('/:id')
.get(ProductController.getById)
//Get products by name
router.route('/name/:name')
    .get(ProductController.getByName)
//Get all products
router.route('/')
    .get(ProductController.getAll)
//Remove product
router.route('/:id')
    .delete(ProductController.remove)
//Update product
router.route('/:id')
    .put(ProductController.update)
//Get by price greater and less equal
router.route('/price/:gte&:lte')
    .get(ProductController.getByPrice)

//Export router module   
module.exports = router