const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
    email:{
        type:String,
        required: [true, "Please enter a email"],
    },
   password:{
    type:String,
    required: [true, "Please enter your password"],
   },

})

const Signupdata = mongoose.model("UserData", registerSchema);
module.exports = Signupdata;