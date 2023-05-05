const mongoose = require('mongoose');

var giftcardSchema = new mongoose.Schema({
    id: {type: String, unique: true, required: true, lowecase: true,},
    name: {type: String, unique: true, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    picture: {type: String},
}, {collection: 'giftcard'});

giftcardSchema.pre('save', function(next) {
    var giftCard = this;
    giftCard.picture = 'https://photowork.net/wp-content/uploads/2017/01/Giftcard.jpg';
    return next();
});

mongoose.model('giftcard', giftcardSchema);