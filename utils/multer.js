const multer = require ("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function( req, file ,cb) {
        cb(null, "public/images");

    },

    // is code se extension bhr aa jyega itne code se  pdf text anything 
    //     const modifiedFilename = Date.now() + path.extname(file.originalname);

    //     cb(null, modifiedFilename)

    filename: function (req,file,cb) {
        const updateName = Date.now() + path.extname(file.originalname);

        cb(null, updateName)
    }
});
const fileFilter = function (req,file,cb){
   const filetypes  =/jpeg|jpg|png|gif|svg|webp/;
   const mimetype = filetypes.test(file.mimetype);
   const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
   )

   if(mimetype && extname){
       return cb(null,true);

   }else{
   cb("ERROR: Images only!");
   }
   
};




    const upload = multer ({
        storage :storage
         
    });
    
    module.exports = upload;