const mongoose = require('mongoose')
const schema = mongoose.Schema
const paginate = require("mongoose-paginate")
mongoose.set('useFindAndModify', false);
// Reviews Schema

const reviewSchema = new schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type:String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    added: {
        type: Date,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    username: {
        type:String,
        required: false
    }
})

// Product Schema

const productSchema = new schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rate: {
        type:Number,
        required:false
    },
    added: {
        type: Date,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    reviews: {
        type: [reviewSchema]
    }
})

//Plugins
productSchema.plugin(paginate);

//Model
const Product = mongoose.model('product', productSchema)

//Export
module.exports = Product