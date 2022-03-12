const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    ime:{
        type:String,
        trim:true,
        required:true
    },
    prezime:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    userName:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    },
    tipKorisnika:{
        type:String,
        trim:true,
        required:true
    }
});

module.exports=mongoose.model("user", UserSchema);