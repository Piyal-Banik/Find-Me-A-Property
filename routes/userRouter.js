var express = require('express');
var bodyParser = require('body-parser');
const Users = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

var multer = require('multer');
var fs = require('fs-extra');
var path = require('path');

var userRouter = express.Router();
userRouter.use(bodyParser.json());


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        var path = `public/images/profiles/${req.body.username}`;
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
    limits: 1024*1024*5
});


userRouter.post('/signup', upload.single('profile-image'), (req,res,next) => {
    Users.register(new Users({username: req.body.username}), req.body.password, (error, user) => {
        if(req.body.firstname) {
            user.firstname = req.body.firstname;
        }
        if(req.body.lastname) {
            user.lastname = req.body.lastname;
        }
        if(req.body.seller) {
            user.seller = req.body.seller;
        }

        user.profile = req.file.path;

        user.save()
        .then(finalUser => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'applicaiton/json');
            res.json({sucess: true, user: finalUser});
        }, err => next(err))
        .catch(err => next(err))
    });
});

userRouter.post('/signin', passport.authenticate('local'), (req,res,next) => {

    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'applicaiton/json');
    res.json({token: token, user: req.user});
})

module.exports = userRouter;
