const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");
const { validatesingupdata } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken"); 
const {userAuth} = require("./middleware/auth.js");


app.use(express.json());
app.use(cookieParser());

app.post("/signup", async(req, res)=>{

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
 })
   
app.post("/login", async(req, res)=>{
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

app.get("/profile", userAuth, async(req, res)=>{
  try{
   
    const user = req.user;
    res.send(user);
    }catch(err){
        res.status(500).send("Error fetching profile: " + err.message);
    }
})
app.get("/sendconnection", userAuth, async (req,res)=>{
       try{
        const user = req.user;
        res.send(user);
         }catch(err){
            res.status(500).send("Error sending connection: " + err.message);
       }
}
)

app.get("/feed", async (req,res)=>{
    const useremail = req.query.email;
    try{
        const users = await User.findOne({email: useremail});
        if(!users){
            res.status(404).send("No users found with the provided email");
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(500).send("Error fetching users: " + err.message);   
    }
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