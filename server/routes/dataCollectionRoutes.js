const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const dataCollectionController = require('../controllers/dataCollectionController');

// POST: Create new field work image
router.post('/admin-dashboard/field-work/create', upload.single('image'), dataCollectionController.createImage);

// GET: Fetch all images
router.get('/admin-dashboard/field-work', dataCollectionController.getAllImages);

// DELETE: Delete an image
router.delete('/admin-dashboard/field-work/:id', dataCollectionController.deleteImage);

//Getting data on home page 
router.get('/field-images', dataCollectionController.getAllFieldImages);

//Getting a single image by ID
router.get('/admin-dashboard/field-work/edit/:id', dataCollectionController.getSingleImage);

//Updating an image using an ID 
router.put('/admin-dashboard/field-work/edit/new/:id', upload.single('image'), dataCollectionController.updateFieldImage);

module.exports = router;
