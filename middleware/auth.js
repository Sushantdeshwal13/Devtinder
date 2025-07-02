const userAuth = (req, res, next) =>{
    // Read the token from the req cookies
     const {token} = req.cookies;
    // validate the token
    //find the user from the token
    // if user found, attach the user to req.user

}