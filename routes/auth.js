"use strict";

const router = require('express').Router();


// Controller
const authCtrl = require('../controllers/authCtrl');

router.get('/', (req,res)=>{
    res.send("auth route");
});


router.post('/signup', authCtrl.signup );

router.get('/account/verify/:userId', authCtrl.emailVerification);


module.exports = router;
