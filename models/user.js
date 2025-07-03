const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstname:{
        type : String,
        required: true,
        minLength:3,
        maxLength: 20,
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

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({ _id: user._id },"devtindersecret" 
    );
    return token;
};

userSchema.methods.validatepassword = async function(passwordinputbyuser){
    const user = this;
    const passwordhash = user.password;

    const ispassvalid =  bcrypt.compare(passwordinputbyuser, passwordhash);

    return ispassvalid;
}

module.exports = mongoose.model("User", userSchema);
