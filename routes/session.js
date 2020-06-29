const router = require('express').Router();

const goToLoginPage = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

router.get('/user/userSession', goToLoginPage, (req, res) => {
    if(req.session.user){
        user = req.session.user;
        return res.send({user});
    }
    return res.status(404);
});

module.exports = router;