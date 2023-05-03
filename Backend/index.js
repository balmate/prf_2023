const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const app = express();
const port = process.env.PORT || 3000;
const dbUrl = '';

mongoose.connect(dbUrl);

mongoose.connection.on('connected', () => {
    console.log('db csatlakoztatva');
})

require('./models/example.model');
require('./models/user.model');

const userModel = mongoose.model('user');

mongoose.connection.on('error', (err) => {
    console.log('hiba tortent ', err);
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({}));

const whiteList = ['http://localhost:4200']

app.use(cors({origin: function(origin, callback) {
    if (whiteList.indexOf(origin) >= 0) {
        callback(null, true);
    } else {
        callback(new Error('CORS Error'));
    }
}, credentials: true, methods: "GET,PUT,POST,DELETE,OPTIONS"}));

passport.use('local', new localStrategy(async function(username, password, done) {
    const user = await userModel.findOne({username: username});
    if (!user) {
        return done('Hiba a lekeres soran, vagy nincs ilyen user', null);
    }
    user.comparePasswords(password, function(err, isMatch) {
        if (err) return done(err, false);
        if (!isMatch) return done('Hibas jelszo', false);
        return done(null, user);
    });
}));

passport.serializeUser(function(user, done) {
    if (!user) return done('Nincs megadva beleptetheto felhasznalo', null);
    return done(null, user);
});

passport.deserializeUser(function(user, done) {
    if (!user) return done('Nincs user akit kileptethetnenk', null);
    done(null, user);
});

app.use(expressSession({secret: 'prf2023beadandovege', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/', require('./routes'));

app.listen(port, () => {
    console.log('The server is running!');
});