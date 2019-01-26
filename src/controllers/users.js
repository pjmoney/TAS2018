const  jwt = require('jsonwebtoken')
const User = require('../models/users.model')
const Product = require('../models/products.model')
const {JWT_SECRET} = require('../config/config')

signInToken = (user) => {
    return jwt.sign({
        iss: 'tas2018',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1) //exp time is set to 1 day
    }, JWT_SECRET)
}

module.exports = {
    signUp: async (req, res, next) => {
        const {username, email, password, country} = req.value.body

        // Checking if user exists
        const existUserEmail = await User.findOne({ email })
        const existUserUsername = await User.findOne({ username })
        if(existUserEmail || existUserUsername) { 
            return res.status(403)
                .json({ error: 'Username or Email already in use!'})
            }

        const registered = new Date().getTime()

         
        //Create new user
        const newUser = new User({username, email, password, registered, country})

        //Generate token
        const token = signInToken(newUser)

        await newUser.save()

         //Respond with token
         res.status(200).json({ token })
    },
    signIn: async (req, res, next) => {
        const {email, password} = req.value.body
        user = req.user
        userId = user._id
        const exsistUser = await User.findOne({email})
        if(!exsistUser){
            return res.status(403)
                .json({ error: 'Wrong email or password'})
        }
        //token generation
        const token = signInToken(user)
        res.status(200).json({ token, userId })
        
        console.log('Successfully logged in!')
    },
    secret: async (req, res, next) => {
        console.log('I manage to get here!')
        res.json({
            secret: "resource"
        })
    },
    getUserProducts: async(req, res, next) => {
        Product.find({userId: req.params.userId}).then(doc => {
            if(!doc) { return res.status(400).end()}
            return res.status(200).json(doc)
        })
    },
    getAll: async(req, res, next) => {
        User.find({}, function (err, users){
            if(err){
                res.send('Something went wrong')
                next()
            }
            res.json(users)
        })
    },
    getById: async(req, res, next) =>{
        User.findOne({_id: req.params.id})
            .then(doc => {
                if(!doc) { return res.status(400).end()}
                return res.status(200).json(doc)
            })
            .catch(err => next(err))
    },
    remove: async(req,res,next) => {
        User.findOneAndDelete({_id: req.params.id})
        .exec()
        .then(doc => {
            if(!doc) return res.status(400).end()
            return res.status(200).end('Removed ' + req.params.id)
        })
        .catch(err => next(err))
    },
    update: async(req,res,next) => {
        const {username, email} = req.value.body
        const userExistUsername = await User.findOne({ username })
        const userExistEmail = await User.findOne({ email })
        if(userExistUsername){
            if(userExistUsername._id != req.params.id)
            return res.status(402)
            .json({ error: 'User with given username exists'})
        }

        if(userExistEmail){
            if(userExistEmail._id != req.params.id)
            return res.status(403)
            .json({ error: 'User with given email exists'})
        }
        const conditions = { _id: req.params.id }
        User.updateOne(conditions, req.body)
        .then(doc => {
            if (!doc) return res.status(400).end()
            return res.status(200).json(doc)
        })
        .catch(err => next(err))
    }
}