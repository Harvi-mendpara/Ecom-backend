const mongoose = require("mongoose");

const checkSchema = new mongoose.Schema({
    fName :{
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
        minlength: (10)["ContactNumber must be of 10 digit"],
        maxlength: (10)["ContactNumber must be of 10 digit"],
      },
    email: {
        type: String,
        required: true,
        validator(value) {
            if ((!validator, isEmail(value))) {
              return console.error("invalid email");
            }
          },
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    check: {
        type: String,
        // required: true,
    },
})


//create a new collection
module.exports = mongoose.model("check", checkSchema);