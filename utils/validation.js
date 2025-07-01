const validator = require('validator');

const validatesingupdata = (req) =>{
    const {firstname, lastname, email, password} = req.body;

    if(!firstname || !lastname){
        throw new Error ("Name is not valid");
    }
    else if(!validator.isEmail(email)){
        throw new Error ("Email is not valid")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error ("Enter a strong password")
    }
};
module.exports = {validatesingupdata};