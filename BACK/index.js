const express = require("express");
const app = express();
const cors = require("cors");

const baza= require("./BAZA/baza");
const user = require("./BAZA/korisnik");

const PORT=80;

//pokretanje servera
app.listen(PORT, function()
{
    console.log("Server slusa na portu : "+PORT);
});

//Povezivanje sa mongodb bazom
baza();

//disable-ovanje cors greske
app.use(cors());
//ubacivanje podrske za json
app.use(express.json());

//deo za hostovanje fronta
app.get("/:file", function(req,res){
    var file=req.params.file;
    res.sendFile('/home/smorovs/test/files/' + file);
});


