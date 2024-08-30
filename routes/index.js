var express = require('express');
var router = express.Router();
const path = require("path");
const fs = require("fs");


const Photocollection = require("../models/Photoschema");
const { checkPrice } = require ("../utils/middlewares");
const upload = require ("../utils/multer");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("home",);
});
router.get("/Album",async function(req, res, next) {
  const allPhotos = await Photocollection.find()
   console.log(allPhotos)
  res.render("Album",{ photos: allPhotos});
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});
router.get('/create-photo', function(req, res, next) {
  res.render('createphoto',);
});
// router.post('/create-photo',async function(req, res, next) {
router.post(
  "/create-photo",
  upload.single("clip"),
  checkPrice,
  async function(req, res, next){

  try{
    const newphoto = await new Photocollection({
      ...req.body,
      clip:req.file.filename,

    });
       await newphoto.save();
     res.redirect("/Album")

  }catch(error){
    console.log(error);
    res.send(error);
    

  }
});
router.get("/details/:id", async function(req, res, next) {
  const photoID = req.params.id
  const photo = await Photocollection.findById(photoID)
  res.render("detailsphoto",{photo:photo });
});


router.get('/update-photo/:id', async function(req, res, next) {
  try{
  const photo = await Photocollection.findById(req.params.id)
  

  res.render("updatephoto", {photo: photo});
  }catch(errpr){
    console.log(err)
    res.send(err.message)
  }
});


router.post(
  "/update-photo/:id",
  upload.single("clip"),
  async function (req, res, next) {
      try {
          const updatedphoto = { ...req.body };
          if (req.file) {
              updatedphoto.clip = req.file.filename;
              fs.unlinkSync(
                  path.join(
                      __dirname,
                      `../public/images/${req.body.oldimage}`
                  )
              );
          }
          await Photocollection.findByIdAndUpdate(req.params.id, updatedphoto);
          res.redirect(`/details/${req.params.id}`);
      } catch (error) {
          console.log(error);
          res.send(error);
      }
  }
);
router.get('/delete/:id', async function(req, res, next) {
  const updatePhoto = await Photocollection.findByIdAndDelete(req.params.id)
  fs.unlinkSync(path.join(__dirname, `../public/images/${photo.clip}`));
 return  res.redirect(`/Album`);
});

module.exports = router;

