const multer = require("multer");
// const pushprofile = multer({ dest: './public/user' })

const filestore = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/user");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: filestore }); 

module.exports = upload;
