const express = require('express');
const router = express.Router();

const passport = require('passport');
const mongoose = require('mongoose');
const exampleModel = mongoose.model('example');
const userModel = mongoose.model('user');
const giftcardModel = mongoose.model('giftcard');

router.route('/login').post((req, res, next) => {
    if (req.body.username && req.body.password) {
        passport.authenticate('local', function (error, user) {
            if (error) return;
            req.logIn(user, function (error) {
                if (error) return;
                return res.status(200).send(user.accessLevel);
            })
        })(req, res);
    } else return res.status(400).send('Hibas keres, username es password szukseges!');
});

router.route('/logout').post((req, res, next) => {
    if (req.isAuthenticated()) {
        req.logOut(function (err) {
            if (err) res.status(500).send('Nem volt bejelentkezve');
            else { res.status(200).send('Sikeres kijelentkezes!'); }
        });
    }
    // return res.status(403).send('Nem volt bejelentkezve!');
});

router.route('/status').get((req, res, next) => {
    if (req.isAuthenticated()) {
        return res.status(200).send(req.session.passport);
    }
    return res.status(403).send('Nem volt bejelentkezve!');
});

router.route('/product').get((req, res, next) => {
    if (req.query.id) {
        giftcardModel.find({ id: req.query.id }, (err, giftcard) => {
            if (err) return res.status(500).send('DB hiba!');
            if (giftcard) res.status(200).send(giftcard);
            else return res.status(500).send('Nem talalhatoak termekek');
        });
    } else return res.status(500).send('Id szukseges!');
});

router.route('/products').get((req, res, next) => {
    giftcardModel.find({}, (err, giftcards) => {
        if (err) return res.status(500).send('DB hiba!');
        if (giftcards) res.status(200).send(giftcards);
        else return res.status(500).send('Nem talalhatoak termekek');
    });
}).post((req, res, next) => {
    if (req.body.params.updates[0].value && req.body.params.updates[1].value && req.body.params.updates[2].value && req.body.params.updates[3].value) {
        giftcardModel.findOne({ id: req.body.params.updates[0].value }, (err, giftcard) => {
            if (err) return res.status(500).send('DB hiba.');
            if (giftcard) return res.status(400).send('Giftcard ezzel az id-vel mar letezik.');
            const newGiftcard = new giftcardModel({ id: req.body.params.updates[0].value, name: req.body.params.updates[1].value,
                 price: req.body.params.updates[2].value, description: req.body.params.updates[3].value });
            newGiftcard.save((error) => {
                if (error) return res.status(500).send('Hiba a mentes soran');
                return res.status(200).send('Sikeres mentes');
            });
        });
    } else return res.status(400).send('Hibas keres, id, name, price es description szukseges! Ezen felul admin jogosultsag szukseges!');
}).delete((req, res, next) => {
    if (req.query['id']) {
        giftcardModel.deleteOne({ id: req.query['id'] }, function (err) {
            if (err) return res.status(500).send('Hiba a torles soran');
            else return res.status(200).send('Sikeres termek torles.');
        });
    } else return res.status(400).send('Hibas keres, id szukseges a torleshez!');
}).put((req, res, next) => {
    if (req.body.params.updates[0].value && req.body.params.updates[1].value && req.body.params.updates[2].value && req.body.params.updates[3].value) {
        giftcardModel.findOne({ id: req.body.params.updates[0].value }, (err, giftcard) => {
            if (err) return res.status(500).send('DB hiba.');
            if (!giftcard) return res.status(400).send('Giftcard ezzel az id-vel nem letezik.');
            giftcard.name = req.body.params.updates[1].value;
            giftcard.price = req.body.params.updates[2].value;
            giftcard.description = req.body.params.updates[3].value;
            giftcard.save((error) => {
                if (error) return res.status(500).send('Hiba a mentes soran');
                else return res.status(200).send('Sikeres mentes');
            });
        });
    } else return res.status(400).send('Hibas keres, id, name, price es description szukseges!');
});

router.route('/users').get((req, res, next) => {
    userModel.find({}, (err, users) => {
        if (err) return res.status(500).send('DB hiba');
        res.status(200).send(users);
    });
});

router.route('/example').get((req, res, next) => {
    exampleModel.findOne({});
    return res.status(200).send(example);
}).post((req, res, next) => {
    if (req.body.id && req.body.value) {
        example = new exampleModel({ id: req.body.id, value: req.body.value });
        example.save();
        return res.status(200).send('Sikeres mentes');
    }
})

router.route('/register').post((req, res, next) => {
    if (req.body.username && req.body.email && req.body.password) {
        userModel.findOne({ username: req.body.username }, (err, user) => {
            if (err) return res.status(500).send('DB hiba.');
            if (user) return res.status(400).send('Ilyen user mar letezik.');
            const newUser = new userModel({ username: req.body.username, password: req.body.password, email: req.body.email });
            newUser.save((error) => {
                if (error) return res.status(500).send('Hiba a mentes soran');
                return res.status(200).send('Sikeres mentes');
            });
        });
    } else return res.status(400).send('Hibas keres, username, password es email szukseges!');
});

module.exports = router;