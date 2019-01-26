const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy
const { ExtractJwt } = require('passport-jwt')
const { JWT_SECRET } = require('./config/config')
const User = require('./models/users.model')

//JWT STRATEGY
passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('auth'),
    secretOrKey: JWT_SECRET
}, async(payload, done) => {
    try{
        //Find users by token
        const user = await User.findById(payload.sub)

         //If doesnt exist, do something...
        if(!user) {
            return done(null, false)
        }

        //Otherwise, return user
        done(null, user)
    } catch(error) {
        done(error, false)
    }
}))

//LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email',
}, async (email, password, done) => {
    try {
         //Find user by email
    const user = await User.findOne({ email })

    //If not, do something
    if(!user){
        return done(null, false)
    }

    //Check if the passwd is correct
    const isMatch = await user.validatePassword(password)
    //If not, do something
    if(!isMatch) {
        return done(null, false)
    }
    //Otherwise, return the user
    done(null, user)
    } catch(error) {
        done(error, false)
    }
}))