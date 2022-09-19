const mongoose = require("mongoose");

const schemaPojistence = new mongoose.Schema({   
    jmeno: {
        type: String,
        required: true
    },
    prijmeni: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    telefon: {
        type: Number,
        required: true
    },
    ulice: {
        type: String,
        required: true
    },
    mesto: {
        type: String,
        required: true
    },
    psc: {
        type: String,
        required: true
    }        
})

const Pojistenec = mongoose.model("pojistenci", schemaPojistence);

module.exports = Pojistenec;