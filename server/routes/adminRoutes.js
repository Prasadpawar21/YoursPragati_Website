const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();
const multer = require('multer');
const verifyToken = require("../middlewares/verifyToken");
const protect = require("../middlewares/protect");

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage })



// GET all users
router.get('/users', adminController.getAllUsers);

// DELETE a user by ID
router.delete('/users/:id', adminController.deleteUserById);

// GET all blogs
router.get('/blog-data', adminController.getAllBlogs);

// DELETE a blog by ID
router.delete('/blog-data/:id', adminController.deleteBlog);

// GET blog by ID
router.get('/blog-data/:id', adminController.getSingleBlog);

// PUT (update) blog by ID
router.put('/blog-data/:id', upload.single('image'), adminController.updateBlog);

// GET all collaboration entries
router.get("/collab", adminController.getAllCollaborations);

// DELETE specific collaboration entry (optional)
router.delete("/collab/:id", adminController.deleteCollab);


// Only verified JWT users can access
router.get("/admin-access/me", protect, adminController.getCurrentUser);
router.post("/admin-access/grant-access", protect, adminController.grantAdminAccess);
router.post("/admin-access/revoke-access", protect, adminController.revokeAdminAccess);
router.get("/admin-access/list-admins", protect, adminController.listAdmins);

module.exports = router;
