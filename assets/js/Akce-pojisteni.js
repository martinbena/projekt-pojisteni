"use strict";

class AkcePojisteni {
    constructor() {
        this.poleAlertu = document.getElementsByClassName("alerty");
        this.vytvoritPojisteni = document.getElementById("vytvorit-pojisteni");
        this.editacePojisteni = document.getElementById("uprava-pojisteni");
        this.tabulkaPojisteni = document.getElementById("seznam-pojisteni");
        this.pridatPojisteniOsobe = document.getElementById("pridat-pojisteni");
        this.nastavitPojisteniOsobe = document.getElementById("nastaveni-pojisteni");
        this.zadnePojisteni = document.getElementById("zadne-pojisteni");
        this.mazaciTlacitko = $(".vymazat");

        this.nastavUdalosti();
    }

    vytvorPojisteni() {
        $("#vytvorit-pojisteni").submit((event) => {
    
        if(!this.vytvoritPojisteni.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            this.vytvoritPojisteni.classList.add("was-validated");
        } else {
            event.preventDefault();
            const dataFormulare = new FormData(this.vytvoritPojisteni);
            let dataFormulareJSON = {};
            for (const [key, value] of dataFormulare.entries()) {
                dataFormulareJSON[key] = value;
            }         
            
            let dotaz = {
                "url": `http://localhost:3000/api/pojisteni`,
                "method": "POST",
                "data": dataFormulareJSON,
                "error": 
                    this._napisAlert("Při ukládání došlo k chybě: Toto pojištění již bylo vytvořeno.", "danger")
                
            };

            $.ajax(dotaz).done((response) => {        
                this._napisAlert("Pojištění bylo úspěšně vytvořeno!", "success"); 
                setTimeout(function() {
                    window.location.reload();
                }, 1000)
            })

            }
        
        })
    }

    upravPojisteni() {
        $("#uprava-pojisteni").submit((event) => {
    
        if(!this.editacePojisteni.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            this.editacePojisteni.classList.add("was-validated");
        } else {
            event.preventDefault();
            const dataFormulare = new FormData(this.editacePojisteni);
            let dataFormulareJSON = {};
            for (const [key, value] of dataFormulare.entries()) {
                dataFormulareJSON[key] = value;
            }         
            
            let dotaz = {
                "url": `http://localhost:3000/api/pojisteni/${dataFormulareJSON.id}`,
                "method": "POST",
                "data": dataFormulareJSON,
                "error": 
                    this._napisAlert("Při editování došlo k chybě: Tato kategorie pojištění již byla vytvořena.", "danger")
            };

            $.ajax(dotaz).done((response) => {        
                this._napisAlert("Data pojištění byla úpěšně změněna!", "success");             
            })
        }    
    })
    }

    vymazKategorii() {
        if(window.location.pathname=="/pojisteni") {    
    
        this.mazaciTlacitko.click((event) => {
            let id = $(event.currentTarget).attr("data-id");        
            

            if(confirm("Opravdu si přejete smazat pojištění?")) {
                fetch(`http://localhost:3000/api/pojisteni/${id}`, {
                    method: "DELETE"
                });
                this._napisAlert("Pojištění bylo úspěšně smazáno!", "success");
                setTimeout(function() {
                    window.location.reload();
                }, 1000)
            }
        })

        }
    }

    pridejPojisteniOsobe() {
        $("#pridat-pojisteni").submit((event) => {
    
        const odkdy = document.getElementById("od");
        const dokdy = document.getElementById("do");

        if(!this.pridatPojisteniOsobe.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            this.pridatPojisteniOsobe.classList.add("was-validated");
        } else if(Date.parse(odkdy.value) > Date.parse(dokdy.value)) {   
            event.preventDefault();
            event.stopPropagation();
            this._napisAlert("Chyba při zadávání datumu: Platnost pojištění nemůže běžet pozpátku!", "danger");

        } else {
            event.preventDefault();
            const dataFormulare = new FormData(this.pridatPojisteniOsobe);
            let dataFormulareJSON = {};
            for (const [key, value] of dataFormulare.entries()) {
                dataFormulareJSON[key] = value;
            }   

            let dotaz = {
                "url": `http://localhost:3000/api/pojistenci/${dataFormulareJSON.pojisteny_id}/osobni`,
                "method": "POST",
                "data": dataFormulareJSON,
                "error": 
                    this._napisAlert("Během vytváření pojištění došlo k neočekávané chybě.")
                
            };

            $.ajax(dotaz).done((response) => {        
                this._napisAlert("Pojištění bylo úspěšně přidáno pojištěnci!", "success"); 
                setTimeout(function() {
                    window.location.reload();
                }, 1000)
            })   

        }
        
        })
    }

    vymazPojisteni() {
        if(window.location.href.indexOf("detail") > -1) {    

        this.mazaciTlacitko.click((event) => {
            let id = $(event.currentTarget).attr("data-id");  
            let id_pojistence = document.getElementById("id-pojistence");
            

            if(confirm("Opravdu si přejete smazat toto pojištění?")) {
                fetch(`http://localhost:3000/api/pojistenci/${id_pojistence}/osobni/${id}`, {
                    method: "DELETE"
                });
                this._napisAlert("Pojištění bylo úspěšně smazáno.", "success");
                setTimeout(function() {
                    window.location.reload();
                }, 1000)
            }
        })   
        }
    }

    nastavPojisteni() {
        $("#nastaveni-pojisteni").submit((event) => {
    
        const odkdy = document.getElementById("od");
        const dokdy = document.getElementById("do");

        if(!this.nastavitPojisteniOsobe.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            this.nastavitPojisteniOsobe.classList.add("was-validated");
        } else if(Date.parse(odkdy.value) > Date.parse(dokdy.value)) {   
            event.preventDefault();
            event.stopPropagation();
            this._napisAlert("Chyba při zadávání datumu: Platnost pojištění nemůže běžet pozpátku!", "danger");

        } else {
            event.preventDefault();
            const dataFormulare = new FormData(this.nastavitPojisteniOsobe);
            let dataFormulareJSON = {};
            for (const [key, value] of dataFormulare.entries()) {
                dataFormulareJSON[key] = value;
            }         
            
            let dotaz = {
                "url": `http://localhost:3000/api/pojistenci/${dataFormulareJSON.pojisteny_id}/osobni/${dataFormulareJSON.id}`,
                "method": "POST",
                "data": dataFormulareJSON,
                "error": 
                    this._napisAlert("Při editování došlo k chybě.", "danger")
            };

            $.ajax(dotaz).done((response) => {        
                this._napisAlert("Data pojištění byla úpěšně změněna.", "success");             
            })        

        }
    
        })
    }

    _zkontrolujPocet() {
        if(window.location.href.indexOf("detail") > -1 && this.tabulkaPojisteni.childNodes.length > 1) {
        this.zadnePojisteni.classList.add("d-none");
        } else if (window.location.href.indexOf("detail") > -1) {
            this.zadnePojisteni.classList.remove("d-none");
        }
    }

    _napisAlert(zprava, druh) {        
        this.poleAlertu[0].innerHTML = "";
        const divAlertu = document.createElement("div");
         divAlertu.innerHTML = [`<div class ="alert alert-${druh} alert-dismissible fade show my-3" role="alert">`, 
        `<p><strong>${zprava}</strong></p>`,
        `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`].join('')        
        this.poleAlertu[0].appendChild(divAlertu);
    };

    nastavUdalosti() {
        this._zkontrolujPocet();
        this.vytvorPojisteni();
        this.upravPojisteni();
        this.vymazKategorii();
        this.pridejPojisteniOsobe();
        this.nastavPojisteni();
        this.vymazPojisteni();        
    }
}