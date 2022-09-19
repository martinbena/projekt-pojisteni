const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

const connectDB = require("./server/database/connection");

const app = express();

dotenv.config({path:"config.env"});
const PORT = process.env.PORT || 8080;

// přehled logů
app.use(morgan("tiny"));

// připojení k MongoDB
connectDB();

// parsování v body-parseru
app.use(bodyparser.urlencoded({extended:true}));
// nastavení view engine
app.set("view engine", "ejs");

// nahrát assety 
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/bootstrap/css", express.static(path.resolve(__dirname, "assets/bootstrap/css")));
app.use("/bootstrap/js", express.static(path.resolve(__dirname, "assets/bootstrap/js")));

// načíst router
app.use("/", require("./server/routes/router"));


app.listen(PORT, () => {console.log(`Server běží na http://localhost:${PORT}`)});