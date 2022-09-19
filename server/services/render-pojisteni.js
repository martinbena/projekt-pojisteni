const axios = require("axios");

exports.pojisteni = (req, res) => {
    axios.get("http://localhost:3000/api/pojisteni")
        .then(function(response) {
           res.render("pojisteni", {pojisteni: response.data}); 
        })
        .catch(err => {
            res.send(err);
        })
}

exports.popis = (req, res) => {
    axios.get("http://localhost:3000/api/pojisteni", {params:{id:req.query.id}})
        .then(function(itemdata) {
            res.render("popis", {pojisteni: itemdata.data})
        })
        .catch(err => {
            res.send(err);
        })  
}

exports.upravit = (req, res) => {
    // získání specifického pojištění
    axios.get("http://localhost:3000/api/pojisteni", {params:{id:req.query.id}})
        .then(function(itemdata) {
            res.render("upravit", {pojisteni: itemdata.data})
        })
        .catch(err => {
            res.send(err);
        })    
}

exports.osobni = (req, res) => {
     axios.get("http://localhost:3000/api/pojistenci/:id/osobni", {params:{id:req.query.id}})
        .then(function(itemdata) {
            res.render("osobni-pojisteni", {osobniPojisteni: itemdata.data})
        })
        .catch(err => {
            res.send(err);
        }) 
}

exports.nastavit = (req, res) => {
     axios.get("http://localhost:3000/api/pojistenci/:id/osobni", {params:{id:req.query.id}})
        .then(function(itemdata) {
            res.render("nastavit", {osobniPojisteni: itemdata.data})
        })
        .catch(err => {
            res.send(err);
        }) 
}