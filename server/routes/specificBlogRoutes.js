// routes/allBlogRoutes.js
const express = require('express');
const router = express.Router();
const { getBlogById , getRelatedBlogs } = require('../controllers/blogController');

// Route to get a specific blog by ID
router.get('/:id', getBlogById); 

//Using tags send by frontend to get related blogs
router.post('/related', getRelatedBlogs); 



module.exports = router;
