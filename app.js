const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");

app.use(express.json());

app.post("/signup", async(req, res)=>{

     const user = new User(req.body);
    try{
     await user.save();
     res.send("User added successfully");
    }
    catch(err){
        res.status(500).send("Error adding user: " + err.message);
    }
 })

app.get("/feed", async (req,res)=>{
    const useremail = req.body.email;
    try{
        const users = await User.findOne({email: useremail});
        if(users.length === 0){
            res.status(404).send("No users found with the provided email");
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(500).send("Error fetching users: " + err.message);   
    }
})
app.get("/all",async(req,res)=>{

    try{
        const users = await User.find({});
        if(users.length ===0){
            res.status(400).send("No users found");
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(500).send("Error fetching users: " + err.message);
    }
})

app.get("/delete", async(req,res)=>{
     const userid = req.body.userid;
     try{
        const user = await User.findByIdAndDelete(userid);
        if(!user){
            res.status(404).send("User not found with the provided ID");
        }else{
                res.send("User deleted successfully");
            }
     }catch(err){
        res.status(500).send("Error deleting user: " + err.message);
     }
})

connectDB()
.then(()=>{
    console.log("MongoDB connected successfully");
})

connectDB()
.then(()=>{
    console.log("MongoDB connected successfully");

    app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
})
.catch((error)=>{
    console.error("MongoDB connection failed:", error);
});