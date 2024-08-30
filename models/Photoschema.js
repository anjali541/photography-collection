const mongoose = require("mongoose");

const Photoschema = new mongoose.Schema({
    clip: String,
    // name:{
    //     type:String,
    //     require: [true,"book name is required"],
    //     minLength: [4, "book name have must atleast 4 charecters"],
    //     trim:true,
    // },
    name:{
     type:String,
     required: [true,"Photographer name is required"],
     minLength: [4, "Photographer name have must atleast 4 charecters"],
     trim:true,

    },
    isbn:{
        type:String,
        unique:true,
        required: [true," ISBN Number is required"],
        minLength: [5, "photo ISBN  number have must atleast 5 charecters"],
        mixLength: [5, "photo ISBN  number have must exceed  5 charecters"],
        trim:true,

    },
    price:{
        type:Number,
        required:[true ," photo price is required"],
        trim:true,
        defoult:0,

    }, 
    description:{
        type:String,
        required:[true,"Description is required"],
        minLength:[ 10,"Desciption must have atleast 10 charectres"],
        trim:true,
    
    },
},
);

const Photocollection = mongoose .model("Photocollection",Photoschema);

module.exports = Photocollection