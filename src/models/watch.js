const mongoose = require("mongoose");

const watchSchema = new mongoose.Schema({
    image :{
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    material: {
        type: String,   
        required: true,
    },
    features: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    colour: {
        type: String,
        required: true,
    },
    warunty: {
        type: String,
        required: true,
    },
})


//create a new collection
const Watches = new mongoose.model("watch", watchSchema)
module.exports = Watches;