const express = require("express");
const router = express.Router();
const services = require("../services/render");
const servicesPojisteni = require("../services/render-pojisteni");
const controllerPojistence = require("../controller/controller-pojistenec");
const controllerPojisteni = require("../controller/controller-pojisteni");
const controllerOsobniPojisteni = require("../controller/controller-osobni-pojisteni");

// základní procházení
router.get("/", services.homeRoutes);

router.get("/pojistenci", services.pojistenci);

router.get("/pojistenci/novy", services.novy);

router.get("/pojistenci/editovat", services.editovat);

router.get("/pojistenci/detail", services.detail);

router.get("/pojisteni", servicesPojisteni.pojisteni);

router.get("/pojisteni/popis", servicesPojisteni.popis);

router.get("/pojisteni/upravit", servicesPojisteni.upravit);

router.get("/osobni-pojisteni", servicesPojisteni.osobni);

router.get("/osobni-pojisteni/nastavit", servicesPojisteni.nastavit);

// API pojištěnce
router.post("/api/pojistenci", controllerPojistence.create);
router.get("/api/pojistenci", controllerPojistence.find);
router.get("/api/pojistenci/:id", controllerPojistence.findId);
router.post("/api/pojistenci/:id", controllerPojistence.update);
router.delete("/api/pojistenci/:id", controllerPojistence.delete);

// API pojištění
router.post("/api/pojisteni", controllerPojisteni.create);
router.get("/api/pojisteni", controllerPojisteni.find);
router.get("/api/pojisteni/:id", controllerPojisteni.findId);
router.post("/api/pojisteni/:id", controllerPojisteni.update);
router.delete("/api/pojisteni/:id", controllerPojisteni.delete);

// API osobní pojištění
router.post("/api/pojistenci/:id/osobni", controllerOsobniPojisteni.create);
router.post("/api/pojistenci/:id/osobni/:id", controllerOsobniPojisteni.update);
router.get("/api/pojistenci/:id/osobni", controllerOsobniPojisteni.find);
router.get("/api/pojistenci/:id/osobni/:id", controllerOsobniPojisteni.findId);
router.delete("/api/pojistenci/:id/osobni/:id", controllerOsobniPojisteni.deleteId);
router.delete("/api/pojistenci/:id/osobni", controllerOsobniPojisteni.delete);

module.exports = router