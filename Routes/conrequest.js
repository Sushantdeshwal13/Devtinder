const express = require("express");
const {userAuth} = require("../middleware/auth.js");
// This router handles requests related to sending connection requests
// It is used to send connection requests to other users in the application
const requestRouter = express.Router();
requestRouter.get("/sendconnection", userAuth, async (req,res)=>{
       try{
        const user = req.user;
        res.send(user);
         }catch(err){
            res.status(500).send("Error sending connection: " + err.message);
       }
}
)

module.exports = requestRouter; 