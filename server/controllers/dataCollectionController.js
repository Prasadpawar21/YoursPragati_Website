const Image = require('../models/carauselImgModel');

// Create Image Entry
exports.createImage = async (req, res) => {
  try {
    const { title } = req.body;
    const imageUrl = req.file.path; // URL from Cloudinary

    const newImage = new Image({ title, imageUrl });
    await newImage.save();

    res.status(201).json({ message: 'Image uploaded successfully', image: newImage });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Image upload failed' });
  }
};

//Get a data from the database for carouselImage 
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({ images });
  } catch (error) {
    console.error('Error fetching images:', error.message);
    res.status(500).json({ message: 'Failed to fetch images' });
  }
};

// Delete an image by ID
exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error.message);
    res.status(500).json({ message: 'Server error while deleting image' });
  }
};

//Getting image on frontend 
exports.getAllFieldImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch images', error });
  }
};


// GET SINGLE image by ID
exports.getSingleImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: 'Image not found' });
    res.status(200).json(image);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch image' });
  }
};


// updating image using id 
exports.updateFieldImage = async (req, res) => {
  try {
    const { title } = req.body;
    const id = req.params.id;

    const existing = await Image.findById(id);
    if (!existing) return res.status(404).json({ message: 'Image not found' });

    // If new image uploaded via multer-cloudinary
    if (req.file && req.file.path) {
      // Optional: remove old image from Cloudinary if you stored its public_id
      // await cloudinary.uploader.destroy(existing.cloudinaryPublicId);

      existing.imageUrl = req.file.path; // cloudinary gives this
      // Optionally store public_id from req.file.filename
      // existing.cloudinaryPublicId = req.file.filename;
    }

    // Always update title if present
    if (title) existing.title = title;

    await existing.save();

    res.status(200).json({
      message: 'Image updated successfully',
      data: existing,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update image' });
  }
};
