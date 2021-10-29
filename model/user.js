"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email:{
            type: String,
            required: true
        },
        pass :{
            type: String,
            required: true
        },
        verified:{
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
);


module.exports = mongoose.model('user', userSchema);