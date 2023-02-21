const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: '365d' })
}
// login controller
const loginUser = async (req, res) => {
    const { username, password } = req.body
    try{
        const user = await User.login(username, password)
        // user - noul document creat in db
        // cream token
        const token = createToken(user._id)
        res.status(200).json({ username, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
// signup controller
const signupUser = async (req, res) => {
    const { username, password, telefon, email, locatie } = req.body
    try{
        const user = await User.signup(username, password, telefon, email, locatie)
        // user - noul document creat in db

        // cream token
        const token = createToken(user._id)

        res.status(200).json({ username, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
module.exports = {
    signupUser,
    loginUser
}