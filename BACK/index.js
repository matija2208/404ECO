const express = require("express");
const app = express();
const cors = require("cors");

const baza = require("./BAZA/baza");
const user = require("./BAZA/korisnik");

const PORT=3000;

//pokretanje servera
app.listen(PORT, function()
{
    console.log("Server slusa na portu : "+PORT);
});

//Povezivanje sa mongodb bazom
baza();

//ubacivanje podrske za json
app.use(express.json());
//disable-ovanje cors greske
app.use(cors());

//deo za hostovanje fronta
app.get("/:file", function(req,res){
    var file=req.params.file;
    res.sendFile('/home/smorovs/test/files/' + file);
});

//userAPI

    app.get("/api/users", async function(req,res){
        try{
            const all_users = await user.find();
            res.json({
                uspesno:true,
                users:all_users
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });
    app.get("/api/users/:id", async function(req,res){
        try{
            const USER = await user.findById(req.params.id)
            res.json({
                uspesno:true,
                user:USER
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });

    app.post("/api/users", async function(req,res){
        try{
            const new_user = new user({
                email:req.body.email,
                userName:req.body.userName,
                password:req.body.password,
                tipKorisnika:"Korisnik",

                brojTelefona:req.body.brojTelefona,
                opis:req.body.opis
            });

            const saved_user = await new_user.save();

            res.json({
                uspesneost:true,
                id:saved_user._id,
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });
    
    app.put("/api/users/:id", async function(req,res){
        try{
            const USER = await user.findById(req.params.id);
            USER.tipKorisnika=req.body.tipKorisnika;
            await USER.save();
            res.json({
                uspesno:true,
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });

    app.delete("/api/users/:id", async function(req,res){
        try{
            const USER = await user.findById(req.params.id);
            await USER.delete();
            res.json({
                uspesno:true,
            });
        }
        catch(err){
            res.send({
                uspesnost:false,
                poruka:err.message
            });
        }
    });


