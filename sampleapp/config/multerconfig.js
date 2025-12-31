const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
// disk storage 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads/')
    },
    filename: function (req, file, cb) {
      crypto.randomBytes(12, function(err, bytes) {
        const fn = bytes.toString('hex') + path.extname(file.originalname);  
        cb(null, fn);
       //  cb(null, file.fieldname + '-' + uniqueSuffix) // from template
      }); 
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)  // `from template`   
    }
  });
const upload = multer({ storage: storage });

// export upload variable 
module.exports = upload;
