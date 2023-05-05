const express = require("express");
const user = new express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken")
const jwtkey = "watch";

// handle post api for the sign in page


user.post("/register", async (req, res) => {
    try {
        const adduser = new User(req.body)
        console.log("userrrrrrrrrrrrrr", req.body)
        const insertuser = await adduser.save()
        jwt.sign({ insertuser }, jwtkey, { expiresIn: "2h" }, (error, token) => {
            if (error) {
                res.send({ result: "something went wrong" })
            }

            res.status(201).send({ insertuser, auth: token })
        })
    } catch (e) {
        res.status(400).send(e);
    }
})

user.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        const loginuser = await User.findOne(req.body).select("-password");
        if (loginuser) {
            jwt.sign({ loginuser }, jwtkey, { expiresIn: "2h" }, (error, token) => {
                if (error) {
                    res.send({ result: "something went wrong" })
                }

                res.status(201).send({ loginuser, auth: token })
            })
        } else {
            res.send({ result: "user not found" })
        }
    } else {
        res.send({ result: "user not found" })
    }

})


module.exports = user;
