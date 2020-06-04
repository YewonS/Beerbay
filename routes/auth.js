const router = require('express').Router();

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


module.exports = router;