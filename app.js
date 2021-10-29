"use strict";

// Express
const express = require('express');
const app = express();

require('dotenv').config();


//Middlewares
app.use(express.json());


// Routes
const auth = require('./routes/auth');

app.use('/auth', auth);




// "Attrappe" les erreurs envoyé par "throw"
app.use(function (err, req, res, next) {
    console.log('err', err);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).json({ message: err.message, statusCode: err.statusCode });
});


// ecoute du Serveur sur MongoDB
const MongoDB = require('mongoose');

MongoDB
    .connect(process.env.MONGODB)
    .then(() => {
        app.listen(3000, () => {
            console.log(`Running on : ${3000}`);
        });
    })
    .catch(err => {
        throw err;
    });

