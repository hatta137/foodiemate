"use strict"

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/deine-datenbank', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({

    firstName: String,
    lastName: String,
    email: String,
    userName: String,
    password: String,
    ctgTag: Date,
    ctgPTag: Boolean,
});

const User = mongoose.model('User', userSchema);
