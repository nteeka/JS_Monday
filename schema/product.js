var mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    isDelete: {
        type: Boolean,
        // required: true,
        default: false,
    },
    order: {
        type: Number,
        // required: true,
        default: 0,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
})

module.exports = mongoose.model('product', productSchema);;

