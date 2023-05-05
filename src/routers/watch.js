const express = require("express");
const ecom = new express.Router();
const Watch = require("../models/watch");
const verifyToken = require("../../middleware/auth")
const multer = require("multer");
const path = require("path");


//with multer image upload

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "Images")
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const Upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype.toLocaleLowerCase())
        const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase())

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb("Give proper file format to upload")
    }
})



//handle post method 

ecom.post("/add-watch", verifyToken, Upload.single('image'), async (req, res) => {

    let info = {
        image: req.file.filename,
        name: req.body.name,
        material: req.body.material,
        features: req.body.features,
        price: req.body.price,
        colour: req.body.colour,
        warunty: req.body.warunty,

    }

    try {
        const addwatch = new Watch(info)
        console.log("->>>>>>>>>>>>>>>>>>>.", info)
        const insertwatch = await addwatch.save()
        res.status(201).send(insertwatch)
    } catch (e) {
        console.log("e", e);
        res.status(400).send(e);
    }
})



//handle put method id wise


ecom.put("/watch/:id", verifyToken, Upload.single('image'), async (req, res) => {
    let info = {
        image: req.file.filename,
        name: req.body.name,
        material: req.body.material,
        features: req.body.features,
        price: req.body.price,
        colour: req.body.colour,
        warunty: req.body.warunty,

    }
    try {
        const _id = req.params.id;
        const getwatch = await Watch.findByIdAndUpdate(_id, info, {
            new: true,
        });
        res.send(getwatch)
    } catch (e) {
        res.status(500).send(e);
    }
})


//handle get method

ecom.get("/watch", verifyToken, async (req, res) => {
    try {
        const getwatches = await Watch.find({});
        res.send(getwatches)
    } catch (e) {
        res.status(400).send(e);
    }
})

//handle get for add to cart method

ecom.get("/get-watch", async (req, res) => {
    try {
        const getwatches = await Watch.aggregate([
            { $match: { price: { $gte: 10000 } } },
        ]);;
        res.send(getwatches)
    } catch (e) {
        res.status(400).send(e);
    }
})

//for selecting box and display data


ecom.post("/watch", async (req, res) => {
    try {
        const { name } = req.body;

        const profile = await Watch.aggregate([
            {
                $match: {
                    name: name,
                },
            },
        ]);
        res.status(200).send({ profile });
    } catch (error) {
        console.log("error:::::::", error);
        res.status(400).send({ error: error.message });
    }
})




//handle get method id wise

ecom.get("/watch/:id", verifyToken, async (req, res) => {
    try {
        const _id = req.params.id;
        const getwatch = await Watch.findById(_id);
        res.send(getwatch)
    } catch (e) {
        res.status(400).send(e);
    }
})


//handle get method id wise for the search product

ecom.get("/search/:key", verifyToken, async (req, res) => {
    try {
        // const _id = req.params.id;
        const getWATCH = await Watch.find({
            "$or": [
                { name: { $regex: req.params.key } },
                // { price: { $regex: req.params.key } }

            ]
        });
        res.send(getWATCH);
    } catch (e) {
        res.status(400).send(e);
    }
})

//handle delete method id wise


ecom.delete("/watch/:id", verifyToken, async (req, res) => {
    try {

        const deleteWatch = await Watch.findByIdAndDelete(req.params.id, {
            new: true,
        });
        res.send(deleteWatch)
    } catch (e) {
        res.status(500).send(e);
    }
})



module.exports = ecom;
