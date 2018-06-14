const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const Img = mongoose.model('Img');

exports.getitems = function(req, res, next) {
    Item.find({}, function(err, items) {
        if (err) {
            return next(err);
        }
        res.json(items);
        console.log(items);
    });
}

exports.img = function(req, res, next) {
    const filename = req.file.filename;
    const mimetype = req.file.mimetype;
    const size = req.file.size;
    const path = req.file.path;
    console.log(filename);
    console.log(path);

    Img.findOne({ filename: filename }, function(err, existingImg) {
        if (err) {
            console.log(err);
        }
        if (existingImg) {
            console.log('Img already exists in db');
        }
        const img = new Img({
            filename: filename,
            mimetype: mimetype,
            size: size,
            path: path
        });
        img.save(function(err) {
            if (err) {
                console.log(err);
            }
            res.json({ img });
            console.log('img saved, homes');
        });
    });
}

exports.additem = function(req, res, next) {
    const name = req.body.name;
    const price = req.body.price;
    const desc = req.body.desc;
    // const img = req.file.path;
    console.log(name, price, desc);

    Item.findOne({ name: name }, function(err, existingItem) {
        if (err) {
            return next(err);
        }
        if (existingItem) {
            return res.status(422).send({ err: 'Item already exists' });
        }
        const item = new Item({
            name: name,
            price: price,
            desc: desc,
            // img: img
        });
        item.save(function(err) {
            if (err) {
                return next(err);
            }
            res.json({ item });
            console.log('item saved, breh');
        });
    });
}