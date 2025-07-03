const express = require("express");
const authRouter = express.Router();
const { validatesingupdata } = require("../utils/validation.js");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const JWT = require("jsonwebtoken");
const { userAuth } = require("../middleware/auth.js");

authRouter.get("/signup",async(req, res)=>{
      // validation of data
   try{
     validatesingupdata(req); 
  
     const {firstname, lastname, email, password} = req.body;
  
     //Encrypt the password
     const passwordHash = await bcrypt.hash(password, 10);
     console.log(passwordHash);
    //Creating a new instance of the user model
  
       const user = new User({
          firstname,
          lastname,
          email,
          password: passwordHash,
       });
       await user.save();
       res.send("User added successfully");
      }
      catch(err){
       res.status(500).send("Error adding user: " + err.message);
      }
   });

authRouter.post("/login", async(req, res)=>{
     try{
           const {email, password} = req.body;
           const user = await User.findOne({email:email});
           if(!user){ 
             throw new Error("Invalid email or password");
           }
           const ispassvalid = await user.validatepassword(password);
           
           if(ispassvalid){
             // Create a JWT token or set a cookie here if needed
             const token = await user.getJWT(); 
 
             //add the token to cookie and send the response back to the user
             res.cookie("token",token)
             
             res.send("Login successful");
           }else{
             throw new Error("Invalid email or password");
           }
           
     }
     catch(err){
         res.status(500).send("Error logging in: " + err.message);   
 }
 });

 module.exports = authRouter;