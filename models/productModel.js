const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    titlu: {
        type: String,
        required: true
    },
    categorie: {
        type: String,
        required: true
    },  
    poza: {
        type: Object,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    telefon: {
        type: Number,
        required: true
    },
    descriere: {
        type: String,
        required: true
    },
    pret: {
        type: Number,
        required: true
    },
    locatie: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    created_at: {
        type: Date, 
        required: true,
        default: Date.now()
    },
    asigned_users: [
        String,
    ],
    fired: {
        type: Number,
        required: false,
        default: 0
    },
    winner: {
        type: String,
        required: false,
    },
    winner_email: {
        type: String,
        required: false
    },
    winner_telefon: {
        type: Number,
        required: false
    },
    winner_locatie: {
        type: String,
        required: false
    },
    unitate: {
        type: Number,
        required: false,
        default: 2.1
    },
    suma_stransa: {
        type: Number,
        required: false,
        default: 0
    },
    other_fired: {
        type: Number,
        required: false,
        default: 0
    }
})
module.exports = mongoose.model('sellproduct', productSchema)