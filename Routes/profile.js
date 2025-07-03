const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth.js");
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

module.exports = profileRouter;