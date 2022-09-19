const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const childrenRoutes = require('../api/routes/children');
const parentRoutes = require('../api/routes/parents');

// add middleware for logging 
app.use(morgan('dev'))

// parsing middleware
app.use(express.urlencoded({
    extended: true
})
);

// middleware that all request are json
app.use(express.json());

app.get('/', (req, res, next) => {
    res.status(201).json({
        message: "Service is up!",
        method: req.method
    });
});

app.use("/children", childrenRoutes);

app.use("/parents", parentRoutes);

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Requested-With");

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', "POST, PUT, GET, PATCH, DELETE");
    }
    next();
});

// add middleware to handle errors and bad URL paths
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status,
            method: req.method
        },
    });
});


// connect to mongodb
mongoose.connect(process.env.mongodbURL, (err) => {
    if (err) {
        console.error("Error: ", err.message);
    }
    else {
        console.log("MongoDB connection successful");
    }
});
module.exports = app;


