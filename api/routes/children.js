const express = require('express');
const router = express.Router();


// GET 
router.get("/", (req, res, next) => {
    res.json({ message: "Children - GET" });
});


// POST by id
router.post("/", (req, res, next) => {
    res.json({ message: "Children - POST" });
});

// GET by id
router.get("/:childrenId", (req, res, next) => {
    const childrenId = req.params.childrenId;
    res.json({
        message: "Children - GET by Id",
        id: childrenId,
    });
});

// PATCH by id
router.patch("/:childrenId", (req, res, next) => {
    const childrenId = req.params.childrenId;
    res.json({
        message: "Children - PATCH",
        id: childrenId
    });
});


// DELETE by id
router.delete("/:childrenId", (req, res, next) => {
    const childrenId = req.params.childrenId;
    res.json({
        message: "Children - DELETE",
        id: childrenId
    });
});



module.exports = router;