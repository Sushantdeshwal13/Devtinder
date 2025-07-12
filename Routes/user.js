const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionrequest");
const User = require("../models/user");

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
});

userRouter.get("/feed", userAuth, async(req, res) =>{
   try{
        //user should see all the user cards except
        // 0. his own card
        // 1. his connections
        // 2. ignored people
        // 3. already sent the connection request
    
        const loggedinuser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page -1) * limit;

        //find all connection requests (sent + received)
         const connectionRequests = await ConnectionRequest.find({
            $or: [
                { sender: loggedinuser._id},
                {receiver: loggedinuser._id}
            ]
         }).select("sender receiver");

           //the users whiche i want to hide
            const hideuserfromfeed = new Set();
            connectionRequests.forEach((req)=>{
                hideuserfromfeed.add(req.sender.toString());
                hideuserfromfeed.add(req.receiver.toString());
            });
        
            
            const users = await User.find({
                $and: [
                {_id : { $nin: Array.from(hideuserfromfeed)}},
                {_id : { $ne: loggedinuser._id }},
                ]
            }).select(["firstname", "lastname"]).skip(skip).limit(limit);

            res.send(users);
     }  catch(err){
       res.status(400).json({message:err.message});
   }

})

module.exports = userRouter;