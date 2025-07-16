// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const { createBlog  , getAllBlogs , getBlogById } = require('../controllers/blogController');

// const router = express.Router();

// // Configure multer for file storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}${ext}`);
//   }
// });
// const upload = multer({ storage });

// router.post('/create-blog', upload.single('image'), createBlog);
// router.get('/blogs', getAllBlogs);



// module.exports = router;

const express = require('express');
const { upload } = require('../config/cloudinary'); // <- use cloudinary upload
const { createBlog , getAllBlogs } = require('../controllers/blogController');

const router = express.Router();

router.post('/create-blog', upload.single('image'), createBlog);
router.get('/blogs', getAllBlogs);
// router.get('/blogs/:id', getBlogById); // optional but useful

module.exports = router;

