const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Parent = require("../models/parent");


// GET 
router.get("/", (req, res, next) => {
    res.status(200)
        .json({
            message: "Parents - GET",
            metadata: {
                hostname: req.hostname,
                method: req.method
            },
        });
});


// POST by id
// write to the database using the model Schema
router.post("/", (req, res, next) => {
    const newParent = new Parent({
        _id: mongoose.Types.ObjectId(),
        role: req.body.role,
        name: req.body.name
    });

    // write to the database
    newParent.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Parent Posted",
                parent: {
                    role: result.role,
                    name: result.name,
                    id: result._id,
                    metadata: {
                        method: req.method,
                        host: req.hostname
                    }
                }
            });
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).json({
                error: {
                    message: err.message
                }
            })
        });
});

// GET by id
router.get("/:parentId", (req, res, next) => {
    const parentId = req.params.parentId;
    res.status(200)
        .json({
            message: "GET - Parents by Id",
            id: parentId,
            metadata: {
                hostname: req.hostname,
                method: req.method,
            },
        });
});

// PATCH by id
router.patch("/:parentId", (req, res, next) => {
    const parentId = req.params.parentId;

    const updatedParent = {
        role: req.body.role,
        name: req.body.name,
    };

    Parent.updateOne({
        _id: parentId,
    }, {
        $set: updatedParent
    }).then(result => {
        res.status(200).json({
            message: "Updated Parent",
            parent: {
                role: result.role,
                name: result.name,
                id: result.id,
            },
            metadata: {
                host: req.hostname,
                method: req.method
            }
        });
    })
        .catch(err => {
            res.status(500).json({
                error: err.message
            })
        });
});

// DELETE by id
router.delete("/:parentId", (req, res, next) => {
    const parentId = req.params.parentId;
    res.status(200)
        .json({
            message: "Parents - DELETE",
            id: parentId,
            metadata: {
                host: req.hostname,
                method: req.method,
            },
        });
});
module.exports = router;