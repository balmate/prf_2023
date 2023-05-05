const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true, lowecase: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    accessLevel: {type: String}
}, {collection: 'users'});

userSchema.pre('save', function(next) {
    var user = this;
    if(user.username.includes('admin')) user.accessLevel = 'admin';
    else  user.accessLevel = 'basic';
    if (user.isModified('password')) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                console.log('Hiba a salt generalasa soran')
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log('Hiba a hasheles soran');
                    return next(err);
                }
                user.password = hash;
                return next();
            })
        })
    } else {
        return next();
    }
});

userSchema.methods.comparePasswords = function(password, nx) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        nx(err, isMatch);
    });
}

mongoose.model('user', userSchema);   