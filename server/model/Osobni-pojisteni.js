const mongoose = require("mongoose");

const schemaOsobniPojisteni = new mongoose.Schema({    
    druh: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pojisteni"
    },   
    pojisteny_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pojistenci"
    },
    castka: {
        type: Number,
        required: true,        
    },
    predmet: {
        type: String,
        required: true
    },
    od: {
        type: String,
        required: true
    },
    do: {
        type: String,
        required: true
    }    
})

const OsobniPojisteni = mongoose.model("osobni", schemaOsobniPojisteni);

module.exports = OsobniPojisteni;