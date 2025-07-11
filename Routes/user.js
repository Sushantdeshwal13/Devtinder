const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionrequest");

// get all the pending connection request for the loggedin user
userRouter.get("/user/requests/received", userAuth, async(req,res)=>{

   try{
       const loggedinuser = req.user;

       const connectionRequests = await ConnectionRequest.find({
          receiver: loggedinuser._id,
          status: "interested",
       }).populate(
         "sender",
         ["firstname", "lastname"]); 

       res.json({
        message: "Data fetched Successfully",
        data: connectionRequests,
       });
   }
   catch(err){
    res.status(400).send("Error : " + err.message);
   }
});

userRouter.get("/user/connections", userAuth, async(req,res)=>{
    try{
        //sushant => khabib => accepted
        //khabib => conor => accepted
         const loggedinuser = req.user;
         const connectionRequests = await ConnectionRequest.find({
             $or : [
                { receiver: loggedinuser._id, status: "accepted"},
                { sender: loggedinuser._id, status: "accepted"},
             ]
         }) .populate("sender", ["firstname","lastname"])
            .populate("receiver", ["firstname","lastname"]);
            
          const data = connectionRequests.map((row)=>{
            if(row.sender._id.toString() == loggedinuser._id.toString()){
                return row.receiver;
            }
            return row.sender;
          })
             res.json({data});
        }
    catch(err){
        res.status(400).send({message: err.message});
    }
})

module.exports = userRouter;