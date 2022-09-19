const axios = require("axios");


exports.homeRoutes = (req, res) => {    
    res.render("index");
}

exports.pojistenci = (req, res) => {
    // požadavek na /api/pojistenci
    axios.get("http://localhost:3000/api/pojistenci")
        .then(function(response) {
           res.render("pojistenci", {pojistenci: response.data}); 
        })
        .catch(err => {
            res.send(err);
        })
    
}

exports.novy = (req, res) => {
    res.render("novy");
}

exports.editovat = (req, res) => {
    // získání specifického pojištěnce
    axios.get("http://localhost:3000/api/pojistenci", {params:{id:req.query.id}})
        .then(function(userdata) {
            res.render("editovat", {pojistenec: userdata.data})
        })
        .catch(err => {
            res.send(err);
        })    
}

exports.detail = (req, res) => {

    const req1 = axios.get("http://localhost:3000/api/pojistenci", {params:{id:req.query.id}});
    const req2 = axios.get("http://localhost:3000/api/pojisteni");
    const req3 = axios.get("http://localhost:3000/api/pojistenci/:id/osobni");
            
    Promise.all([req1, req2, req3])
        .then(response => {
            const pojistenec = response[0];
            const pojisteni = response[1];            
            const osobniPojisteni = response[2];            
            res.render("detail", {pojistenec: pojistenec.data, pojisteni: pojisteni.data, osobniPojisteni: osobniPojisteni.data})
    })
        .catch(err => {
            res.send(err);
        })      
}
    
