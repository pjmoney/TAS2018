const Product = require('../models/products.model')
const User = require('../models/users.model')
const mongoose = require('mongoose')
module.exports = {
    add: async(req,res,next) => {
        const { name,description,category,price, userId } = req.value.body
        
        const added = new Date().getTime()
        const existName = await Product.findOne({ name })

        if(existName) { 
            return res.status(403)
                .json({ error: 'Product exists!'})
        }

        const newProduct = new Product({name, description, category, price, added, userId})

        await newProduct.save()

        res.status(200).json(newProduct)
    },
    getByCategory: async(req,res,next) => {
        Product.find({category: req.params.category})
            .then(doc => {
                if(!doc) return res.status(400).end()
                return res.status(200).json(doc)
            })
            .catch(err => next(err))
    },
    getById: async(req,res,next) => {
        Product.findById({_id: req.params.id})
            .then(doc => {
                if(!doc) return res.status(400).end()
                return res.status(200).json(doc)
            })
            .catch(err => next(err))
    },
    addProductReview: async(req, res, next) => {
        const {description, rate, user_id } = req.value.body
        const desc_temp = req.body.description
        const name = (desc_temp.split(' ').slice(0,4).join(' '))
        const added = new Date().getTime()
        
        await Product.findByIdAndUpdate(req.params.id,{$addToSet:{reviews:{name, description, rate, added, user_id}}}, (err, doc) =>{
            // If error found or doc isnt exist
            if(err || !doc) return res.status(400).json({'product':'not found'})

            //update rate each time review is added
            //TODOOOO

            

           
        })

        const product_avg_rate_tmp = await Product.aggregate([
            {$match : {_id: mongoose.Types.ObjectId(req.params.id)}},
            {$unwind : "$reviews"},
            {$group:{_id: null, avg: {$avg:"$reviews.rate"}}}], (err, result) => {
                return result[0].avg
                
            })
        const avg = product_avg_rate_tmp[0].avg
        await Product.findOneAndUpdate({_id:req.params.id},{rate:parseFloat(avg)},{new:true},(err, doc) =>{
            return res.status(200).json({review: 'added'})
            })
        
    },
    getProductReviews: async(req, res, next) => {
        await Product.findById({_id:req.params.id},(err, doc) => {
            if (err) return res.status(400).json({product:'not found'})
            return res.status(200).json(doc.reviews)
        }).sort('adde')   
    },
    removeProductReview: async(req, res, next) => {
        await Product.findByIdAndUpdate({_id: req.params.id}, {$pull:{reviews:{user_id:req.user._id}}}, (err, doc) => {
            // If error found or doc isnt exist
            if(err) return res.status(400).end('Something went wrong!')
            if(!doc) return res.status(400).json({'product':'not found'})
            return res.status(200).end('Review has been removed!')
        })
    },
    getByUser: async(req, res, next) => {
        Product.find({userId: req.params.userId}).then(doc => {
            if(!doc) { return res.status(400).end()}
            return res.status(200).json(doc)
        })
    },
    getByName: async(req,res,next) => {
        Product.find({name: new RegExp(req.params.name, "i")})
        .then(doc => {
            if(!doc) return res.status(400).end()
            return res.status(200).json(doc)
        })
        .catch(err => next(err))
    },
    getAll: async(req,res,next) => {
        const perPage = req.query.perPage
        const filters = JSON.parse(req.query.filters)

        const options = {
            page: parseInt(filters.page, 10),
            limit: parseInt(perPage, 10)
        }
        const query = {}

        if(filters.search != "") query.name = new RegExp(filters.search, "i");
        if(filters.rating != 0) query.rate = filters.rating;
        if(filters.category) query.category = filters.category;
        query.price = {
            $gte: filters.price_filter[0],
            $lte: filters.price_filter[1]
        }

        Product.paginate(query, options)
        .then(doc => {
            if(!doc) return res.status(400).end()
            return res.status(200).json(doc)
        })
        .catch(err => next(err))
    },
    remove: async(req,res,next) => {
        Product.findOneAndDelete({_id: req.params.id})
        .exec()
        .then(doc => {
            if(!doc) return res.status(400).end()
            return res.status(200).end('Removed ' + req.params.id)
        })
        .catch(err => next(err))
    },


    update: async(req,res,next) => {
        const conditions = { _id: req.params.id }
        Product.updateOne(conditions, req.body)
        .then(doc => {
            if (!doc) return res.status(400).end()
            return res.status(200).json(doc)
        })
        .catch(err => next(err))
    },
    getByPrice: async(req,res,next) => {
        Product.find({price: {
            $gte: req.params.gte,
            $lte: req.params.lte
        }})
        .then(doc => {
            if(!doc) return res.status(400).end()
            return res.status(200).json(doc)
        })
        .catch(err => next(err))
    },
}