const mongoose = require("mongoose");

const schemaPojisteni = new mongoose.Schema({    
    nazev: {
        type: String,
        required: true,
        unique: true
    },
    popis: {
        type: String,
        required: true
    }  
})

const Pojisteni = mongoose.model("pojisteni", schemaPojisteni);

module.exports = Pojisteni;
