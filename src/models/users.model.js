const mongoose = require('mongoose')
const schema = mongoose.Schema
const bCrypt = require('bcryptjs')

// Schema
const userSchema = new schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    registered: {
        type: Date,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    permission: {
        type: Number,
        required: true,
        default: 0
    },
    token: {
        type: String,
        required: false
    }
})

userSchema.pre('save', async function (next) {
    try {
        //Generate salt
        const salt = await bCrypt.genSalt(10)

        // Generate hashed password with salt which is defined above
        const passwordHash = await bCrypt.hash(this.password, salt)
        
        //Assig new HASHED password to old plained text passowrd, so now - new HASHED password will be saved in db
        this.password = passwordHash
        next()
    } catch(error) {
        next(error)
    }
})

userSchema.methods.validatePassword = async function(newPassword) {
    try {
        return await bCrypt.compare(newPassword, this.password)
    } catch(error) {
        throw new Error(error)
    }
}

//Model
const User = mongoose.model('user', userSchema)

//Export

module.exports = User