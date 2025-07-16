const User = require('../models/userModel');
const Blog = require('../models/blogs');
const Contact = require('../models/contactModel');
const path = require('path');
const fs = require('fs');



// GET /admin/users - get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'firstName lastName email role createdAt adminAccessExpiresAt isTemporaryAdmin');
    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};

// DELETE /admin/users/:id - delete user by ID
exports.deleteUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: `User ${user.firstName} (${user.email}) deleted successfully`,
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
};


// GET /api/admin/blog-data
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({ success: true, blogs });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ success: false, message: 'Failed to fetch blogs' });
  }
};

// DELETE /api/admin/blog-data/:id
// DELETE /api/admin/blog-data/:id
exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ success: false, message: 'Failed to delete blog' });
  }
};

// GET single blog for edit-blogs
exports.getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json({
      _id: blog._id,
      title: blog.title,
      description: blog.description,
      tags: blog.tags,
      createdAt: blog.createdAt,
      imageUrl: blog.imageUrl || null, // ✅ use directly from DB
    });
  } catch (err) {
    console.error('Error fetching single blog:', err);
    res.status(500).json({ message: 'Failed to fetch blog' });
  }
};



// PUT update blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, description, tags, createdAt } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.tags = tags ? tags.split(',').map(t => t.trim()) : blog.tags;
    blog.createdAt = createdAt ? new Date(createdAt) : blog.createdAt;

    if (req.file) {
      // Delete old image from disk if it exists
      if (blog.image) {
        const oldPath = path.join(__dirname, '..', blog.image);
        fs.unlink(oldPath, (err) => {
          if (err) console.log('Old image not deleted:', err);
        });
      }

      blog.image = req.file.path; // store path like 'uploads/filename.jpg'
      blog.imageUrl = `${req.protocol}://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`;
    }

    await blog.save();
    res.status(200).json({ message: 'Blog updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
};


//Get collaborations details 
exports.getAllCollaborations = async (req, res) => {
  try {
    const collaborations = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ collaborations });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//Deleting a collaboration data 
exports.deleteCollab = async (req, res) => {
  try {
    const collab = await Contact.findByIdAndDelete(req.params.id);
    if (!collab) {
      return res.status(404).json({ message: "Collaboration not found" });
    }
    res.status(200).json({ message: "Collaboration deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get current logged-in user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (err) {
    console.error("Failed to fetch current user:", err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};


// Grant temporary admin access
exports.grantAdminAccess = async (req, res) => {
  const { email, duration } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    user.role = "admin";
    user.isTemporaryAdmin = true;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + parseInt(duration));
    user.adminAccessExpiresAt = expiresAt;

    await user.save();
    res.status(200).json({ message: `Admin access granted to ${email} for ${duration} days.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error granting admin access." });
  }
};

// Revoke temporary admin access
exports.revokeAdminAccess = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.isTemporaryAdmin)
      return res.status(404).json({ message: "Temporary admin not found." });

    user.role = "user";
    user.isTemporaryAdmin = false;
    user.adminAccessExpiresAt = null;

    await user.save();
    res.status(200).json({ message: `Admin access revoked for ${email}.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error revoking admin access." });
  }
};

// List all admins
exports.listAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");
    res.status(200).json({ admins });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch admin list." });
  }
};