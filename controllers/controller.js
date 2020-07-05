const TechRecord = require('../models/TechnicalRecord');
const Email = require('../models/Email');
const REflection = require('../models/Reflection');

const nodemailer = require("nodemailer");
const async = require('async');
const path = require("path");
const fs = require("fs");
const multer = require('multer');
const Reflection = require('../models/Reflection');

var storage = multer.diskStorage({
  destination: './public/images/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

var upload = multer({ storage: storage })

exports.newBitGet = function(req, res){
    res.render('newBitGet', {title: ''});
};
exports.newBitPost = function(req, res){
    if(req.body.username == 'Calm2020!' && req.body.password == 'thisWork100%'){
        res.render('options', {title: ''});
    }else{
        res.render('newBitGet', {title: ''});
    }
};
exports.newTecknical = function(req, res){
    res.render('newTechnicalRecord', {title: ''});
}

exports.newBookReflection = function(req, res){
    res.render('newBookReflection', {title: ''});
}

/* save new technical record */
exports.newTechnicalRecord = function(req, res, next){
    let TRecordCopy = new TechRecord({
        Title: req.body.Title,
        ImageName: req.file.filename,
        Caption: req.body.Caption,
        Body: req.body.Body})
    //save post
    let TRecord = new TechRecord({
        Title: req.body.Title,
        ImageName: req.file.filename,
        Caption: req.body.Caption,
        Body: req.body.Body,
    }).save(err => {
        if(err){
            return next(err);
        }
        console.log(req.file);
        res.render('newTechnicalRecord', {title:''});
    });
    //save image
    let upload = multer({ storage: storage}).single('profile_pic');

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        // Display uploaded image for user validation
        res.render('newTechnicalRecord', {title:''});
    });
    //initiate transport andget a list of emails
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'zakarjama@gmail.com',
            pass: 'Honesty2020!'
        }
    });
   
    Email.find({}, 'Email')
    .exec(
        function(err, aList){
            for(var i = 0; i < aList.length; i++){
                console.log('created');
                transporter.sendMail({
                from: 'zakarjama@gmail.com',
                to: aList[i].Email,
                subject: 'New Record from Javascript Journal',
                text: 'There is a new article about ' + TRecordCopy.Title + 'in the javascript journal. Read in here: ',
                });
            }
        }
    );
 

    
};

/* article index pages, read more*/
exports.javaScript = function(req, res){
    TechRecord.find({}, 'Title ImageName Body')
    .exec(
        function(err, aList){
            if(err) {return next(err);}
            res.render('javaScript', {title: 'javaScript Records', aList:aList, searched:false});
        }
    );
  
}
exports.searchTechnical = function(req, res){
    TechRecord.find({}, 'Title ImageName Body')
    .exec(
        function(err, aList){
            if(err) {return next(err);}
            res.render('javaScript', {title: 'javaScript Records', aList:aList, searched:true, searchSubject: req.body.searchSubject});
        }
    );
  
}

exports.technicalDetail = function(req, res, next){
    async.parallel({
        record: function(callback){
            TechRecord.findById(req.params.id).exec(callback)
        },},function(err, results){
            if(err){return next(err);}
            if(results.record == null){
                var err = new Error('Record Not Found');
                err.status = 404;
                return next(err);

            }
            //parse record md
            let parsedRecord = {
                Title : results.record.Title,
                Caption : results.record.Caption,
                ImageName : results.record.ImageName,
            }
            
           
            res.render('technicalDetail', {title: 'Title Caption Body ImageName', record: results.record});
        
    });
}
exports.addEmailToSub = function(req, res, next){
    //save post
    let email = new Email({
        Email: req.body.Email,
    }).save(err => {
        if(err){
            return next(err);
        }
        TechRecord.find({}, 'Title ImageName Body')
        .exec(
        function(err, aList){
            if(err) {return next(err);}
            res.render('javaScript', {title: 'javaScript Records', aList:aList, searched:false});
        }
    );
    });
};
var imageName;
exports.uploadFile = function(req, res, next){
    //set imageName to image uploaded by editor.
    imageName = req.file.filename;
}
exports.saveBookRef = function(req, res, next){
    //req.body contains the object from editor. edit the objects image by adding the filename attribute.
    var reflection = req.body;
    for(let i = 0; i < reflection.blocks.length; i++){
        if(reflection.blocks[i].type =='image'){
            reflection.blocks[i].imageName = imageName;
            console.log(reflection.blocks[i]);
        }
    }

    let ref = new Reflection({
        Reflection: reflection
    }).save(err => {
        if(err){
            return next(err);
        }
        res.send('goog');

    });  
}

/* Reflections index page */
/* article index pages, read more*/
exports.bookreflections = function(req, res){
    Reflection.find({})
    .exec(
        function(err, rList){
            if(err) {return next(err);}
            res.render('reflections', {title: 'book reflections', rList:rList, searched:false});
        }
    );
}

exports.reflectionDetail = function(req, res, next){
    async.parallel({

        record: function(callback){
            Reflection.findById(req.params.id).exec(callback)
        },},function(err, results){
            if(err){return next(err);}
            if(results.record == null){
                var err = new Error('Record Not Found');
                err.status = 404;
                return next(err);

            }
            res.render('reflectionDetail', {title: '', record: results.record});
        
    });
}

