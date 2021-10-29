"use strict";

require('dotenv').config();


// Model
const User = require('../model/user');

// Mailgun
const mailgun = require('mailgun-js')(
    {
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    }
);



exports.signup = (req, res, next) => {
    const { email, pass } = req.body;

    // add new User
    new User({
        email:email,
        pass:pass
    }).save()
    .then(result=>{

        // mailgun
        var data = {
            from: 'MailGun Test <me@samples.mailgun.org>',
            to: 'atoumi@edu.cegepgarneau.ca',
            subject: 'Hello',
            text: `Verify your account on : ${process.env.HOST_PORT}/auth/account/verify/${result._id}`
        };

        mailgun.messages().send(data, (err, body) => {
            if (err) {
                console.log(err);
                throw err;
            }
    
            // Confirmation 
            console.log(body);
            
            res.json({
                user: result
            });
        });
     
    })
    .catch(err=>{
        next(err);
    });




};


exports.emailVerification = (req,res,next)=>{
    const userId = req.params.userId;
    
    User.findById(userId)
    .then(user=>{
        if(!user){
            throw new Error('NO VALID USER');
        }

        user.verified = true;
        res.json({
            message: "verifier",
            user:user
        });
    })
    .catch(err=>{
        next(err);
    });
};