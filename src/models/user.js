const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
      
    },
    password: {
        type: String,
        required: true,
        
    },

})


//create a new collection


module.exports = mongoose.model("users", userSchema);