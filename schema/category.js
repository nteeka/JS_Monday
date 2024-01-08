const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
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
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
})

module.exports = mongoose.model('Category',categorySchema);