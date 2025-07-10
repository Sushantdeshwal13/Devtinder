const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth.js");
const { validateprofiledata, validateEmailOnly, validatenewpassword } = require("../utils/validation.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
// This route is used to fetch the user's profile information
// It requires the user to be authenticated


profileRouter.get("/profile", userAuth, async(req, res)=>{
  try{
    const user = req.user;
    res.send(user);
    }catch(err){
        res.status(500).send("Error fetching profile: " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async(req, res)=>{
   try{
     validateprofiledata(req);
     // req.user is set by the userAuth middleware
     // It contains the authenticated user's information
     // We can use it to update the user's profile 
    const loggedinuser = req.user;  
     
     Object.keys(req.body).forEach((key)=> {
    loggedinuser[key] = req.body[key]
   });

   await loggedinuser.save();
     res.send({
      message: "Profile updated successfully",
      user: loggedinuser,
    });

  }catch(err){
    res.status(500).send("error fetching profile: " + err.message);
  }
})
  
profileRouter.post("/profile/password",async (req, res)=>{
  try {
      validateEmailOnly(req);
      validatenewpassword(req);

      const {email, newpassword} = req.body;
      // Here you would typically find the user by email and update the password
       const user = await User.findOne({email});
       if(!user){
        return res.status(404).send("User not found");
       }
      // Hash new password
      const hashedpassword = await bcrypt.hash(newpassword, 10);
      user.password = hashedpassword;
      await user.save();
      res.send({
          message: "Password updated successfully",
      });
      } catch(err) {
          res.status(500).send("Error updating password: " + err.message);
      }

    })

// This route is used to update the user's email
// It requires the user to be authenticated

module.exports = profileRouter;