let Pojisteni = require("../model/Pojisteni");

exports.create = (req, res) => {
    
    if(!req.body) {
        res.status(400).send({message: "Obsah nesmí být prázdný"});
        return;
    }

    // nová kategorie
    const pojisteni = new Pojisteni({        
        nazev: req.body.nazev,
        popis: req.body.popis        
    })

    // uložit do databáze
    pojisteni
        .save(pojisteni)
        .then(data => {
            res.redirect("/pojisteni")
        })
        .catch(err => {
            res.status(500).send("Během vytváření pojištění nastala chyba: Tato kategorie již byla vytvořena!");
    });
}

exports.find = (req, res) => {
    
    if(req.query.id) {
        const id = req.query.id;

        Pojisteni.findById(id)
            .then(data => {
                if(!data) {
                    res.status(404).send({message:`Nebylo nalezeno pojištění s ID ${id}`})
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({message:`Při hledání pojištění s ID ${id} nastala chyba.`})
            })
    } else {
        Pojisteni.find()
            .then(pojisteni => {
                res.send(pojisteni)
            })
            .catch(err => {
                res.status(500).send({message:err.message || "Během získávání informací o pojištění nastala chyba."});
            });
    }
        
}
exports.findId = (req, res) => {
    
    const id = req.params.id;

    Pojisteni.findById(id)
        .then(data => {
            if(!data) {
                res.status(404).send({message:`Nebylo nalezeno pojištění s ID ${id}`})
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({message:`Při hledání pojištění s ID ${id} nastala chyba.`})
        })

       
}

exports.update = (req, res) => {
    if(!req.body) {
        return res
            .status(400)
            .send({message:"Data na editování nesmí být prázdná."});
    }

    const id = req.params.id;
    Pojisteni.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(!data) {
                res.status(404).send({message: `Nelze editovat pojištění s ID ${id}`});
            } else {                
                res.redirect("/pojisteni");   
            }            
        })
        .catch(err => {
            res.status(500).send({message: "Při editování pojištění nastala chyba."});
        })
}

exports.delete = (req, res) => {
    const id = req.params.id;
    Pojisteni.findByIdAndDelete(id)
        .then(data => {
            if(!data) {
                res.status(404).send({message: `Nelze smazat pojištění s ID ${id}`});
            } else {
                res.send({
                    message: "Pojištění bylo úpěšně smazáno."
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:`Nebylo možno smazat pojištění s ID ${id}`
            });
        });
}