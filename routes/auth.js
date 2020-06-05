const router = require('express').Router();
const emailValidator = require('email-validator');

const User = require('../models/User.js');

/* Bcrypt */
const bcrypt = require('bcrypt');
const saltRounds = 12;


const goToLoginPage = (req, res, next) => {
    if(!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

const goToHomePage = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/');
    } else {
        next();
    }
}

router.get('/signup', goToHomePage, (req, res) => {
    return res.render('./auth/signup.ejs');
})

router.post('/signup', async (req, res) => {
    
    const { username, email, password, passwordRepeat } = req.body;
    const isPasswordTheSame = password === passwordRepeat;
    
    if (username && email && password && isPasswordTheSame) {

        // password requirements
        if (password.length < 8) {
            return res.status(400).send({ response: "Password does not fulfill the requirements" });
        } else if (!emailValidator.validate(email)) {
            return res.status(400).send({ response: "Email is not valid" });
        } else {

            try {
                
            const userFound = await User.query().select().where({ 'username': username }).limit(1);
            if (userFound.length > 0) {
                alert("Username already exits.");
                return res.redirect('/signup');
            } else {
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                const createdUser = await User.query().insert({
                    username,
                    email,
                    password: hashedPassword
                });

                req.session.user = username;
                return res.redirect("/login");
            }

            } catch (error) {
                return res.status(500).send({ response: "Something went wrong with the database." });
            }
        }
    } else if (password && passwordRepeat && !isPasswordTheSame) {
        return res.status(400).send({ response: "Passwords do not match. Fields: password and passwordRepeat" });
    } else {
        return res.status(404).send({ response: "Missing fields: username, password, passwordRepeat" });
    }
    
})



module.exports = router;