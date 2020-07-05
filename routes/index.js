var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller');
const multer = require('multer');
const upload = multer({dest: './public/images'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'journal' });
});

/* article types index page */
router.get('/javascript', controller.javaScript);

/*login to admin to Post */
router.get('/newBit', controller.newBitGet);
router.post('/newBit', controller.newBitPost);

/* new techrecord */
router.get('/newTecknical', controller.newTecknical);
router.get('/newBookReflection', controller.newBookReflection);

router.post('/newTechnicalRecord',upload.single('image'), controller.newTechnicalRecord);
router.get('/Technical/:id', controller.technicalDetail);
router.post('/searchTechnical', controller.searchTechnical);

/*subscription */
router.post('/addEmailToSub', controller.addEmailToSub);
router.post('/saveBookRef', controller.saveBookRef);

/*journal books*/

router.post('/uploadFile', upload.single('image'), controller.uploadFile);
router.post('/editorData', controller.saveBookRef);

/*bookreflections index page and details */
router.get('/bookreflections', controller.bookreflections);
router.get('/Reflection/:id', controller.reflectionDetail);



module.exports = router;
