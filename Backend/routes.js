const express = require('express');
const router = express.Router();

const passport = require('passport');
const mongoose = require('mongoose');
const exampleModel = mongoose.model('example');
const userModel = mongoose.model('user');

router.route('/login').post((req, res, next) => {
    if (req.body.username && req.body.password) {
        passport.authenticate('local', function(error, user) {
            if (error) return;
            req.logIn(user, function(error) {
                if (error) return;
                console.log('eljutunk ' + user)
                return res.status(200).send('Sikeres');
            })
        })(req, res);
    } else return res.status(400).send('Hibas keres, username es password szukseges!');
});

router.route('/logout').post((req, res, next) => {
    if (req.isAuthenticated()) {
        req.logOut(function(err) {
            if (err) res.status(500).send('Nem volt bejelentkezve');
            else { res.status(200).send('Sikeres kijelentkezes!');}
        });
    }
    // return res.status(403).send('Nem volt bejelentkezve!');
});

router.route('/status').get((req, res, next) => {
    if (req.isAuthenticated()) {
        return res.status(200).send(req.session.passport);
    }
    return res.status(403).send('Nem volt bejelentkezve!');
})

router.route('/user').get(async (req, res, next) => {
    const users = await userModel.find({});
    if (users) return res.status(200).send(users);
     return res.status(500).send('DB hiba');
}).post(async (req, res, next) => {
    if (req.body.username && req.body.email && req.body.password) {
        const existingUser = await userModel.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).send('Hiba, mar letezik ilyen username!');
        }
        const newUser = new userModel({ username: req.body.username, password: req.body.password, email: req.body.email });
        const created = await newUser.save();
        if (created) {
            return res.status(200).send('Sikeres mentes!');
        }
        return res.status(500).send('Hiba a mentes soran');
    } else {
        return res.status(400).send('Hibas keres, username, email es password szukseges!');
    }
})

router.route('/example').get(async (req, res, next) => {
    const example = await exampleModel.findOne({});
    return res.status(200).send(example);
}).post(async (req, res, next) => {
    console.log(req.body);
    if (req.body.id && req.body.value) {
        example = new exampleModel({ id: req.body.id, value: req.body.value });
        await example.save();
        return res.status(200).send('Sikeres mentes');
    }
})

module.exports = router;