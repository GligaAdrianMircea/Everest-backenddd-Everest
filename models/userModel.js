const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    telefon: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    locatie: {
        type: String,
        required: true
    }
})

userSchema.statics.signup = async function(username, password, telefon, email, locatie) {

    if(!username || !password) {
        throw Error("Va rugam sa completati toate campurile")
    }
    if(!telefon || !email) {
        throw Error("Va rugam sa completati toate campurile")
    }
    if(!locatie){
        throw Error("Va rugam sa completati toate campurile")
    }

    const exists = await this.findOne({ username })

    if(exists){
        throw Error('Acest username exista deja')
    }

    const salt = await bcrypt.genSalt(10)
    // salt: parola inainte: user, dupa: user2n23wmv3nM, adauga ceva random dupa, am pus acolo 10, deci o sa fie 10 caractere adaugate random, pt securitate

    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, password: hash , telefon, email, locatie})

    return user
}

userSchema.statics.login = async function(username, password) {
    if(!username || !password) {
        throw Error("Va rugam sa completati toate campurile")
    }

    const user = await this.findOne({ username })

    if(!user) {
        throw Error('Username-ul este incorect')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Parola este incorecta')
    }

    return user
}
 
module.exports = mongoose.model('User', userSchema)