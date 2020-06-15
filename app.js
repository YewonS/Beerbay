const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("views"));

app.set('view engine', 'ejs');
const ejs = require('ejs');

/* Socket.io*/

const server = require("http").createServer(app);
const io = require("socket.io")(server);

const escape = require('escape-html');

io.on('connection', socket => {

    socket.on('a client wrote this', (data) => {
        // emits to all clients
        io.emit("A client said", { message: escape(data.message) , username: data.username});
    });


});

/* Session */

const session = require('express-session');
app.use(session({
    secret: require('./config/configSession.json').sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
        sameSite: true,
        secure: false
    }
}));

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50 // limit each IP to 100 requests per windowMs
});
app.use("/login", limiter);
app.use("/signup", limiter);


/* Setup Objection + Knex */

const { Model } = require('objection');
const Knex = require('knex');
const knexFile = require('./knexfile.js');

const knex = Knex(knexFile.development);

Model.knex(knex);


/* Add routes */
const beerRoute = require('./routes/beers.js');
const userRoute = require('./routes/users.js');
const categoryRoute = require('./routes/categories.js');
const ratingRoute = require('./routes/ratings.js');
const barRoute = require('./routes/bars.js');
const collectionRoute = require('./routes/collections.js');
const authRoute = require('./routes/auth.js');
const functionRoute = require('./routes/functionality.js');
app.use(beerRoute);
app.use(userRoute);
app.use(categoryRoute);
app.use(ratingRoute);
app.use(barRoute);
app.use(collectionRoute);
app.use(authRoute);
app.use(functionRoute);


const goToLoginPage = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

const goToHomePage = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/home');
    } else {
        next();
    }
}

app.get('/', goToHomePage, (req, res) => {
    console.log("session: ", req.sessionID);
    console.log("user: ", req.session.user);

    return res.render('./global/main.ejs', { sessionUser: req.session.user });
})

app.get('/home', goToLoginPage, (req, res) => {
    console.log("session: ", req.sessionID);
    console.log("user: ", req.session.user);

    return res.render('./global/home.ejs', { sessionUser: req.session.user });
})



/* Start server */

const PORT = 3000;

server.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", PORT);
});