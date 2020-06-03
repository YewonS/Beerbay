const router = require('express').Router();

const User = require('../models/User.js');

router.get('/user/email/:email', async(req, res) => {
    const email = req.params.email;
    const userFound = await User.query().select('email').where({ 'email': email }).limit(1);
    if (userFound > 0) {
        return res.send({ response: userFound });
    } else {
        return res.status(400).send({ response: "User with the email not found." });
    }

})

router.get('/user/username/:username', async(req, res) => {
    const username = req.params.username;
    const userFound = await User.query().select('username').where({ 'username': username }).limit(1);
    if (userFound > 0) {
        return res.send({ response: userFound });
    } else {
        return res.status(400).send({ response: "User with the username not found." });
    }

})