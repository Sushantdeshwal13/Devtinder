const mongoose = require("mongoose");

const connectionschema = new mongoose.Schema({
    
     sender:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
     },
     receiver:{
         type:mongoose.Schema.Types.ObjectId,
        required:true,
     },
     status:{
        type:String,
        required:true,
        enum:{
        values : ["ignored","interested", "accepted", "rejected"],  // you create enum when the values are related and should not change
        message: `{VALUE} is iincorrect status type`
    }
}
},{
    timestamps:true, 
}
 );

 connectionschema.index({sender:1, receiver:1 });

 connectionschema.pre("save", function(next){
    const connectionRequest = this;
    // Check if the receiver is same as sender
    if(connectionRequest.sender.equals(connectionRequest.receiver)){
        throw new Error("cannot send connection request to yourself");
    }
    next();
 });

const connectionrequest = mongoose.model("ConnectionRequest", connectionschema);

module.exports = connectionrequest;