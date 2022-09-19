"use strict";

class AkcePojistence {
    constructor() {
        this.novyPojistenec = document.getElementById("novy-pojistenec");
        this.editacePojistence = document.getElementById("edit-pojistence");
        this.upravPojistence = document.getElementById("uprav-pojistence");
        this.mazaciTlacitko = $(".smazat");
        this.zadnyPojistenec = document.getElementById("zadny-pojistenec");
        this.tabulkaPojistencu = document.getElementById("seznam-pojistencu");
        this.poleAlertu = document.getElementsByClassName("alerty");    

        this.nastavUdalosti();
    }

    vytvorPojistence() {
        $("#novy-pojistenec").submit((event) => {
            
        if(!this.novyPojistenec.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            this.novyPojistenec.classList.add("was-validated");
        } else {
            event.preventDefault();
            const dataFormulare = new FormData(this.novyPojistenec);
            let dataFormulareJSON = {};
            for (const [key, value] of dataFormulare.entries()) {
                dataFormulareJSON[key] = value;
            }         
            
            let dotaz = {
                "url": `http://localhost:3000/api/pojistenci`,
                "method": "POST",
                "data": dataFormulareJSON,
                "error": this._napisAlert("Při vytváření pojištěnce nastala chyba. Nejspíše se pokoušíte zadat e-mailovou adresu, kterou již využívá jiný pojištěnec.", "danger")
            };

            $.ajax(dotaz).done(() => {  
                this.novyPojistenec.reset();
                this.novyPojistenec.classList.remove("was-validated");
                this._napisAlert("Pojištěnec byl úspěšně přidán!", "success");             
            })

        }
        
        })
    }

    editujPojistence() {
        $("#edit-pojistence").submit((event) => {
    
        if(!this.editacePojistence.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            this.editacePojistence.classList.add("was-validated");
        } else {
            event.preventDefault();
            const dataFormulare = new FormData(this.editacePojistence);
            let dataFormulareJSON = {};
            for (const [key, value] of dataFormulare.entries()) {
                dataFormulareJSON[key] = value;
            }         
            
            let dotaz = {
                "url": `http://localhost:3000/api/pojistenci/${dataFormulareJSON.id}`,
                "method": "POST",
                "data": dataFormulareJSON,
                "error": this._napisAlert("Při úpravě pojištěnce nastala chyba. Nejspíše se pokoušíte zadat e-mailovou adresu, kterou již využívá jiný pojištěnec.", "danger")
            };

            $.ajax(dotaz).done(() => {   
                this.editacePojistence.classList.remove("was-validated");
                this._napisAlert("Data pojištěnce byla úspěšně upravena!", "success");             
            })

        }
        
        })
    }

    vymazPojistence() {
        if(window.location.pathname=="/pojistenci") {    

        this.mazaciTlacitko.click((event) => {
            
            let id = $(event.currentTarget).attr("data-id");

            if(confirm("Opravdu si přejete smazat pojištěnce a všechna jeho pojištění?")) {
                fetch(`http://localhost:3000/api/pojistenci/${id}`, {
                    method: "DELETE"
                });
                fetch(`http://localhost:3000/api/pojistenci/${id}/osobni`, {
                    method: "DELETE"
                });                
                this._napisAlert("Pojištěnec byl úspěšně smazán!", "success");
                setTimeout(function() {
                    window.location.reload();
                }, 1000)
            }        
        })  
        } else {
            
            this.mazaciTlacitko.click((event) => {
                let id = $(event.currentTarget).attr("data-id");        
                

                if(confirm("Opravdu si přejete smazat pojištěnce a všechna jeho pojištění?")) {
                    fetch(`http://localhost:3000/api/pojistenci/${id}`, {
                        method: "DELETE"
                    });
                    fetch(`http://localhost:3000/api/pojistenci/${id}/osobni`, {
                        method: "DELETE"
                    });
                    alert("Pojištěnec byl úspěšně smazán. Spolu s ním i všechna jeho pojištění!");
                    location.replace("/pojistenci")
                }
            })
        }
    }    

    _zkontrolujPocet() {
        if(window.location.pathname=="/pojistenci" && this.tabulkaPojistencu.childNodes.length > 1) {
        this.zadnyPojistenec.classList.add("d-none");
        } else if(window.location.pathname=="/pojistenci") {
            this.zadnyPojistenec.classList.remove("d-none");
        };
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
        this.vytvorPojistence();
        this.editujPojistence();
        this.vymazPojistence();
    }
}