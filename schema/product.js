var mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name:String,
    descritption: String,
    image : URL,
    price:Number
});

module.exports = mongoose.model('product', schema);;

