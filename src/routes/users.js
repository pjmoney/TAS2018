const express = require('express')
const router = require('express-promise-router')()
const { validateBody, schemas } = require('../helpers/userRouteHelpers')
const UserController = require('../controllers/users')
const passport = require('passport')
const passportConfig = require('../passport')

const passportSignIn = passport.authenticate('local', {session: false})
const passportJWT = passport.authenticate('jwt', { session: false })

router.route('/signup')
    .post(validateBody(schemas.authSchema), UserController.signUp)

router.route('/signin')
    .post(validateBody(schemas.loginSchema), passportSignIn, UserController.signIn)

router.route('/secret')
    .get(passportJWT, UserController.secret)
// Get list of all users
router.route('/')
    .get(UserController.getAll)

// Get user with given id
router.route('/:id')
    .get(UserController.getById)

//Remove user by id
router.route('/:id')
    .delete(UserController.remove)

//Update user by id
router.route('/:id')
    .put(validateBody(schemas.updateSchema), UserController.update)

//Export router module    
module.exports = router