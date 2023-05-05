const express = require("express");
const check = new express.Router();
const checkout=require("../models/check")
const verifyToken = require("../../middleware/auth")

check.post("/checkout",verifyToken, async (req, res) => {
    try {
        const checkpro = new checkout(req.body)
        console.log("->>>>>>>>>>>>>>>>>>>.", checkpro)
        const insertwatch = await checkpro.save()
        res.status(201).send(insertwatch)
    } catch (e) {
        console.log("e", e);
        res.status(400).send(e);
    }
})


module.exports = check;