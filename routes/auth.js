const router = require('express').Router();
const emailValidator = require('email-validator');

const User = require('../models/User.js');

/* Bcrypt */
const bcrypt = require('bcrypt');
const saltRounds = 12;


const goToHomePage = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/home');
    } else {
        next();
    }
}

router.get('/signup', goToHomePage, (req, res) => {
    return res.render('./auth/signup.ejs');
})

router.get('/login', goToHomePage, (req, res) => {
    console.log('session:', req.sessionID);
    console.log('user:', req.session.user);
 
    return res.render('./auth/login.ejs');
})


// TODO: make a tiny chat system with sockets. just with messages saying that chat system is to be deployed in the future.

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

router.post("/login", async (req, res) => {

    const { username, password } = req.body;

    if (username && password) {
        try {
            User.query().select('username').where({ 'username': username }).then( async userFound => {
                if (userFound.length == 0) {
                    return res.redirect("/login?error");
                } else {
                    const matchingPassword = await User.query().select('password').where({ 'username': username }).limit(1);
                    const passwordToValidate = matchingPassword[0].password;

                    bcrypt.compare(password, passwordToValidate).then((result) => {
                        if (result) {
                            req.session.user = username;
                            return res.redirect("/home");
                        } else {
                            return res.redirect("login?error");
                        }
                    });
                }

            });
        } catch (error) {
            return res.redirect("/login?error");
        }

    } else {
        return res.redirect("/login?error");
    }
    
});

router.get("/logout", (req, res) => {
    req.session.destroy((error)=> {
        console.log("Error happend when logging out:", error);
    })
    return res.redirect('/');
});





module.exports = router;