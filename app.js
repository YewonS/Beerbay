const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));


/* Setup Objection + Knex */

const { Model } = require('objection');
const Knex = require('knex');
const knexFile = require('./knexfile.js');

const knex = Knex(knexFile.development);

Model.knex(knex);

const bcrypt = require('bcrypt');
const saltRounds = 12;
// bcrypt.hash("password1", saltRounds, function(err, hash) {
//     console.log(hash);
// });

/* Start server */

const PORT = 3000;

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", PORT);
});