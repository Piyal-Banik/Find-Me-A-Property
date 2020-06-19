var express = require('express');
var bodyParser = require('body-parser');
var Propertys = require('../models/property');

var propertyRouter = express.Router();
propertyRouter.use(bodyParser.json());

var multer = require('multer');
var fs = require('fs-extra');
var path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var path = `public/images/properties/${req.body.title}`;
        fs.ensureDirSync(path);
        cb(null, path);
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

var imageFilter = (req, file, cb) => {
    var ext = path.extname(file.originalname);

    if(ext != '.png' && ext != '.jpg' && ext != '.jpeg') {
        cb(new Error('Only Image can be uploaded'));
    }
    else {
        cb(null, true);
    }
};

var upload = multer({
    storage: storage, 
    fileFilter: imageFilter, 
    limits: 1024*1024*10
});

propertyRouter.post('/register', upload.fields([{name: 'displayImage', maxCount: 1},{name: 'galleryImages', maxCount: 4}]), (req,res,next) => {
    var galleryImages = req.files.galleryImages;

    var galleryImagesPaths = galleryImages.map(image => image.path);
    
    var property = new Propertys({title: req.body.title});

    property.description = req.body.description;
    property.type = req.body.type;
    property.status = req.body.status;
    property.location = req.body.location;
    property.bedrooms = req.body.bedrooms;
    property.bathrooms = req.body.bathrooms;
    property.garage = req.body.garage;
    property.price = req.body.price;
    property.area = req.body.area;
    property.year = req.body.year;
    property.displayImage = req.files.displayImage[0].path;
    property.galleryImages = galleryImagesPaths;

    property.save()
    .then(property => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'applicaiton/json');
        res.json({sucess: true, property: property});
    }, err => next(err))
    .catch(err => next(err))
})

module.exports = propertyRouter;