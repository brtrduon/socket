const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const adminSchema = new Schema({
    username: { type: String, unique: true, lowercase: true },
    first_name: String,
    last_name: String,
    password: String,
});

const itemSchema = new Schema({
    name: { type: String, unique: true, lowercase: true },
    price: Number,
    desc: String,
    // img: String
});

const imgSchema = new Schema({
    // _item: { type:Schema.Types.ObjectId, ref: 'Item'},
    filename: { type: String, unique: true },
    mimetype: String,
    size: Number,
    path: String
});

// const customerSchema = new Schema({
//     first_name: String,
//     last_name: String,
//     phone_number: { type: String, unique: true },
//     email: { type: String, unique: true },
//     party_size: Number,
//     date: String,
//     time: String
// });

adminSchema.pre('save', function(next) {
    const admin = this;
    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(admin.password, salt, null, function(err, hash) {
            if (err) {
                return next(err);
            }
            admin.password = hash;
            next();
        });
    });
});

adminSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
}

const modelClass = mongoose.model('admin', adminSchema);
const Item = mongoose.model('Item', itemSchema);
const Img = mongoose.model('Img', imgSchema);
// const Customer = mongoose.model('Customer', customerSchema);

module.exports = modelClass;