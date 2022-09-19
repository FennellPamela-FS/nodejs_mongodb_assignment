const express = require('express');
const router = express.Router();


// GET 
router.get("/", (req, res, next) => {
    res.json({ message: "Authors - GET" });
});


// POST by id
router.post("/", (req, res, next) => {
    res.json({ message: "Authors - POST" });
});

// GET by id
router.get("/:authorId", (req, res, next) => {
    const authorId = req.params.authorId;
    res.json({
        message: "Authors - GET by Id",
        id: authorId
    });
});

// PATCH by id
router.patch("/:authorId", (req, res, next) => {
    const authorId = req.params.authorId;
    res.json({
        message: "Authors - PATCH",
        id: authorId
    });
});


// DELETE by id
router.delete("/:authorId", (req, res, next) => {
    const authorId = req.params.authorId;
    res.json({
        message: "Authors - DELETE",
        id: authorId
    });
});



module.exports = router;