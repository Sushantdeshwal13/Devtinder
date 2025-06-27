const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{
        type : String,
        required: true,
    },
    lastname :{
        type: String,
    },
    email :{
        type:String,
        required: true,
        unique:true,
    },
    password :{
        type:String,
    },
    age :{
        type:Number,
    },
    gender :{
        type:String,
    },
    photourl:{
        type:String,    
    },
    about :{
        type:String, 
        default: "Hey there! I'm sushant",
    },   
    skills :{
        type:[String],
    },
},
{ 
    timestamps: true,  
}
     
);

module.exports = mongoose.model("User", userSchema);
