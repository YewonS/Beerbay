const router = require('express').Router();

const authorised = (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('/login');
    } else {
        next();
    }00
}

router.get('/admin/beer', authorised, async (req, res) => {
    return res.render('./admin/beerAdmin.ejs', { sessionAdmin: req.session.admin, sessionUser : req.session.user });
});

router.get('/admin/price', authorised, async (req, res) => {
    return res.render('./admin/priceAdmin.ejs', { sessionAdmin: req.session.admin, sessionUser : req.session.user });
});

router.get('/admin/order', authorised, async (req, res) => {
    return res.render('./admin/orderAdmin.ejs', { sessionAdmin: req.session.admin, sessionUser : req.session.user });
});



module.exports = router;