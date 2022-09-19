let OsobniPojisteni = require("../model/Osobni-pojisteni");


exports.create = (req, res) => {
    
            
    if(!req.body) {
        res.status(400).send({message: "Obsah nesmí být prázdný"});
        return;
    }
    
    const osobniPojisteni = new OsobniPojisteni({ 
        druh: req.body.druh,   
        pojisteny_id: req.body.pojisteny_id,
        castka: req.body.castka,
        predmet: req.body.predmet,
        od: req.body.od,
        do: req.body.do,   
    })

    osobniPojisteni
        .save(osobniPojisteni)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send("Během vytváření pojištění nastala chyba.");
        });
}

exports.find = (req, res) => {
     
    if(req.query.id) {
        const id = req.query.id;
        OsobniPojisteni.findById(id).populate("pojisteny_id", "jmeno prijmeni").populate("druh", "nazev")
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
     OsobniPojisteni.find().populate("pojisteny_id", "jmeno prijmeni").populate("druh", "nazev")
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

        OsobniPojisteni.findById(id).populate("pojisteny_id", "jmeno prijmeni").populate("druh", "nazev")
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
    OsobniPojisteni.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(!data) {
                res.status(404).send({message: `Nelze editovat pojištění s ID ${id}`});
            } else {                
                res.send(data);
            }            
        })
        .catch(err => {
            res.status(500).send({message: "Při editování pojištění nastala chyba."});
        })
}

exports.deleteId = (req, res) => {
    const id = req.params.id;
    OsobniPojisteni.findByIdAndDelete(id)
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

exports.delete = (req, res) => {
    
    let id = req.params.id;
    
        OsobniPojisteni.deleteMany({pojisteny_id: id})
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