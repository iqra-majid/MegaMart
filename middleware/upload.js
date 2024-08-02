// lib/middleware/upload.js
import multer from 'multer';
import path from 'path';

// Configure multer
const storage = multer.diskStorage({
   
  destination: './public/uploads', // Set the destination folder
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    console.log("in the flefilter function");
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
