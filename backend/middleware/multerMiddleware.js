import multer from "multer";

// Multer For User Image

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/users');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
})


const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/products');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


export const uploadUserImage = multer({storage : storage});

export const uploadProductImage = multer({storage : storage2});

