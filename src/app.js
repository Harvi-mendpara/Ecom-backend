const express = require("express");
const ecom = require("./routers/watch");
const user = require("./routers/user");
const check =require("./routers/checkout")
const cors = require("cors");
require("../src/db/conn");


const app = express();
const port = process.env.port || 8080;

app.use(cors());
app.use(express.json());
app.use(ecom);
app.use(user);
app.use(check)

app.use("/Images",express.static("Images"))




app.listen(port, () => {
    console.log(`connection is live at port no. ${port}`)
})