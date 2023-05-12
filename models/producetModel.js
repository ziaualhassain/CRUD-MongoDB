const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true,"Please enter a name"],
        },

        quantity: {
            type: Number,
            required: true,
            default: 0,
        },

        price: {
            type:Number,
            required: true,
        },

        image:{
            type: String,
            required: false,
        }
    },

    {
        timestamp : true
    }
)

const Product = mongoose.model('Product',productSchema);

module.exports = Product;