var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var propertySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    type: {
        type: String
    },
    status: String,
    location: {
        type: String
    },
    bedrooms: {
        type: Number,
        min: 1
    },
    bathrooms: {
        type: Number,
        min: 0
    },
    garage: {
        type: Number,
        min: 0
    },
    price: {
        type: Number,
        min: 0
    },
    area: {
        type: String
    },
    year: {
        type: Date
    },
    displayImage: {
        type: String,
        default: ''
    },
    galleryImages: [{
        type: String,
        default: ''
    }]
}, {
    timestamps: true
});

var Propertys = mongoose.model('Property', propertySchema);
module.exports = Propertys;