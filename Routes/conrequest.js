const express = require("express");
const mongoose = require("mongoose");
const {userAuth} = require("../middleware/auth.js");
// This router handles requests related to sending connection requests
// It is used to send connection requests to other users in the application
const requestRouter = express.Router();
const connectionrequest = require("../models/connectionrequest");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionrequest");

requestRouter.post(
       "/request/send/:status/:touserid",
        userAuth, async (req,res)=>{
        try{ 
           const sender = req.user._id; 
           const receiver = req.params.touserid ;
           const status =  req.params.status;
            
           const allowedstatus = ["ignored", "interested"];
           if(!allowedstatus.includes(status)){
            return res.status(400)
            .json({message: "invalid status type:" + status});
           }
           
         
           const touser = await User.findById(receiver);
           if(!touser){
             return res.status(404).json({message: "user not found!"});
           }
           // if there is an existing connection requrest 
           const existingconnectionrequest = await connectionrequest.findOne({
            $or:[
                { sender, receiver},
                { sender: receiver, receiver: sender},
            ],
           });
           if(existingconnectionrequest){
            return res 
            .status(400)
            .send({message: "connection request already exists!"});
           }

           const ConnectionRequest = new connectionrequest({
            sender, receiver, status,
           });

           const data = await ConnectionRequest.save();
            
           res.json( {
            message: 
               req.user.firstname + " is " + status + " in " + touser.firstname,
            data,
        });

        }catch(err){
            res.status(400).send("ERROR : " + err.message);
        }
       }
    );


requestRouter.post(
  "/request/review/:status/:requestid",
  userAuth,
  async (req, res) => {
    try {
      const loggedinuser = req.user;
      const { status, requestid } = req.params;

      const allowedstatus = ["accepted", "rejected"];
      if (!allowedstatus.includes(status)) {
        return res.status(400).json({ message: "Status not allowed" });
      }
      const connectionRequest = await ConnectionRequest.findOne({
          _id: requestid,
          receiver: loggedinuser._id,
          status: "interested",
      })
        if(!connectionRequest){
          return res.status(404).json({message: "Status not allowed"})
        }

      // ✅ Update and save
      connectionRequest.status = status;
      const data = await connectionRequest.save();

      res.json({ message: "Connection request " + status, data });
    } catch (err) {
      console.error("Review Error:", err);
      res.status(500).send("ERROR: " + err.message);
    }
  }
);


module.exports = requestRouter; 