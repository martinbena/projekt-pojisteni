let Pojistenec = require("../model/Pojistenec");

// vytvořit a uložit nového pojištěnce
exports.create = (req, res) => {
    // validace
            
    if(!req.body) {
        res.status(400).send({message: "Obsah nesmí být prázdný"});
        return;
    }

    // nový pojištěnec
    const pojistenec = new Pojistenec({        
        jmeno: req.body.jmeno,
        prijmeni: req.body.prijmeni,
        email: req.body.email,
        telefon: req.body.telefon,
        ulice: req.body.ulice,
        mesto: req.body.mesto,
        psc: req.body.psc,              
    })

    // uložit do databáze
    pojistenec
        .save(pojistenec)
        .then(data => {
            res.redirect("/pojistenci/novy")
        })
        .catch(err => {
            res.status(500).send("Během vytváření pojištěnce nastala chyba: Pod touto e-mailovou adresou je již někdo registrován!");
        });
}

// získat pojištěnce
exports.find = (req, res) => {
    
        if(req.query.id) {
        const id = req.query.id;

        Pojistenec.findById(id)
            .then(data => {
                if(!data) {
                    res.status(404).send({message:`Nebyl nalezen pojištěnec s ID ${id}`})
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({message:`Při hledání pojištěnce s ID ${id} nastala chyba.`})
            })   
        } else { 

            Pojistenec.find()
            .then(pojistenec => {
                res.send(pojistenec)
            })
            .catch(err => {
                res.status(500).send({message:err.message || "Během získávání informací o pojištěnci nastala chyba."});
            });
        }
        
}
exports.findId = (req, res) => {   
        
        const id = req.params.id;

        Pojistenec.findById(id)
            .then(data => {
                if(!data) {
                    res.status(404).send({message:`Nebyl nalezen pojištěnec s ID ${id}`})
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({message:`Při hledání pojištěnce s ID ${id} nastala chyba.`})
            })    
        
}

// editovat pojištěnce podle ID 
exports.update = (req, res) => {
    if(!req.body) {
        return res
            .status(400)
            .send({message:"Data na editování nesmí být prázdná."});
    }

    const id = req.params.id;    
    
    Pojistenec.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if(!data) {
                res.status(404).send({message: `Nelze editovat pojištěnce s ID ${id}`});
            } else {
                
                res.send(data)  
            }            
        })
        .catch(err => {
            res.status(500).send({message: "Při editování pojištěnce nastala chyba."});
        })
}

// vymazat pojištěnce podle ID 
exports.delete = (req, res) => {
    const id = req.params.id;
    
    Pojistenec.findByIdAndDelete(id)
        .then(data => {
            if(!data) {
                res.status(404).send({message: `Nelze smazat pojištěnce s ID ${id}`});
            } else {
                res.send({
                    message: "Pojištěnec byl úpěšně smazán."
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message:`Nebylo možno smazat pojištěnce s ID ${id}`
            });
        });        
}