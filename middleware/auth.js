const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async(req, res, next) =>{
    // Read the token from the req cookies
    try{
    const {token} = req.cookies;
     if(!token){
        throw new Error("No token found");
     }

     const decodemsg = await jwt.verify(token, "devtindersecret");
     const { _id } = decodemsg;
     const user = await User.findById(_id);
     if(!user){
        throw new Error("User not found");
     }
     req.user = user; // Attach the user to the request object
     next();

    // validate the token
    //find the user from the token
    // if user found, attach the user to req.user
} catch (err){
    res.status(400).send("error :" + err.message);
 }
};

module.exports = {userAuth};