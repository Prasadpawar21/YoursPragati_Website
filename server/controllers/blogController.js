const Blog = require('../models/blogs');
const mongoose = require("mongoose");
//1 . Creating Blog : 
// const createBlog = async (req, res) => {
//   try {
//     const { title, description, createdAt } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ error: 'Image file is required.' });
//     }

//     const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

//     const newBlog = new Blog({
//       title,
//       description,
//       imageUrl,
//       createdAt: new Date(createdAt)
//     });

//     await newBlog.save();
//     res.status(201).json({ message: 'Blog created successfully!', blog: newBlog });

//   } catch (error) {
//     console.error('Error creating blog:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// 1. Creating Blog :
// const createBlog = async (req, res) => {
//   try {
//     const { title, description, createdAt, tags } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ error: 'Image file is required.' });
//     }

//     const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

//     const newBlog = new Blog({
//       title,
//       description,
//       imageUrl,
//       createdAt: new Date(createdAt),
//       tags: Array.isArray(tags)
//         ? tags
//         : typeof tags === 'string' && tags.trim() !== ''
//         ? tags.split(',').map(tag => tag.trim())
//         : []
//     });

//     await newBlog.save();
//     res.status(201).json({ message: 'Blog created successfully!', blog: newBlog });

//   } catch (error) {
//     console.error('Error creating blog:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// const createBlog = async (req, res) => {
//   try {
//     const { title, description, tags, date } = req.body;

//     const imageUrl = req.file?.path || null; // cloudinary auto-generates .path URL

//     const newBlog = new Blog({
//       title,
//       description,
//       tags: JSON.parse(tags), // assuming tags are sent as JSON string
//       date,
//       image: imageUrl,
//     });

//     await newBlog.save();
//     res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
//   } catch (error) {
//     console.error('Error creating blog:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


const createBlog = async (req, res) => {
  try {
    const { title, description, tags, createdAt } = req.body;

    // ✅ Cloudinary gives public image URL in req.file.path
    const imageUrl = req.file?.path;

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image upload failed' });
    }

    const newBlog = new Blog({
      title,
      description,
      imageUrl,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
      tags: tags ? JSON.parse(tags) : [], // if you sent tags as JSON string from frontend
    });

    await newBlog.save();

    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    console.error('Error creating blog:');
    res.status(500).json({ message: 'Internal server error pasha' });
  }
};

// //2. Displaying Blog on homepage 
// // GET all blogs (newest first)
// const getAllBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find().sort({ createdAt: -1 });
//     res.status(200).json(blogs);
//   } catch (error) {
//     console.error('Error fetching blogs:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// 2. Displaying Blogs on Homepage 
// GET all blogs (newest first)
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    // Ensure every blog has a 'tags' field (empty array if not present)
    const normalizedBlogs = blogs.map(blog => ({
      ...blog._doc,
      tags: blog.tags || []
    }));

    res.status(200).json({ blogs: normalizedBlogs });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// 3. Get a specific blog by ID
const getBlogById = async (req, res) => {
  const { id } = req.params;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid blog ID' });
  }

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json({ blog });
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// 4.Get a specific blog by tags 
// const getRelatedBlogs = async (req, res) => {
//   try {
//     const { tags, exclude } = req.query;
//     const tagArray = tags?.split(',') || [];

//     const relatedBlogs = await Blog.find({
//       _id: { $ne: exclude },
//       tags: { $in: tagArray }
//     }).sort({ createdAt: -1 }).limit(5); // Optional: limit to 5

//     res.json({ blogs: relatedBlogs });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch related blogs' });
//   }
// };

// const getRelatedBlogs = async (req, res) => {
//   try {
//     let { tags, exclude } = req.query;

//     // Split tags string into array if it's a string
//     if (typeof tags === 'string') {
//       tags = tags.split(',');
//     }

//     const relatedBlogs = await Blog.find({
//       _id: { $ne: exclude },
//       tags: { $in: tags }
//     }).sort({ createdAt: -1 });

//     res.status(200).json({ blogs: relatedBlogs });
//   } catch (error) {
//     console.error('Error fetching related blogs:', error);
//     res.status(500).json({ error: 'Failed to fetch related blogs' });
//   }
// };

// const getRelatedBlogs = async (req, res) => {
//   try {
//     const { tags, exclude } = req.query;

//     if (!tags) {
//       return res.status(400).json({ message: 'Tags are required' });
//     }

//     const tagsArray = tags.split(',');

//     const blogs = await Blog.find({
//       _id: { $ne: mongoose.Types.ObjectId(exclude) },
//       tags: { $in: tagsArray },
//     }).sort({ createdAt: -1 });

//     res.status(200).json({ blogs });
//   } catch (error) {
//     console.error('Error fetching related blogs:', error);
//     res.status(500).json({ message: 'Failed to fetch related blogs' });
//   }
// };


//Front -end sends tags using post request , we filter the blogs based on those tags and send the selected blogs back to the front-end 
const getRelatedBlogs = async (req, res) => {
  try {
    const { tags, exclude } = req.body;

    if (!tags || !Array.isArray(tags)) {
      return res.status(400).json({ message: 'Tags must be an array' });
    }

    const excludeId = new mongoose.Types.ObjectId(exclude); // ✅ FIX HERE

    const blogs = await Blog.find({
      _id: { $ne: excludeId },
      tags: { $in: tags },
    }).sort({ createdAt: -1 });

    res.status(200).json({ blogs });
  } catch (error) {
    console.error('Error fetching related blogs:', error);
    res.status(500).json({ message: 'Failed to fetch related blogs' });
  }
};


module.exports = { createBlog , getAllBlogs ,getBlogById , getRelatedBlogs };
