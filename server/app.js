const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const path = require('path');

// Loads the router 
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const specificBlogRoutes = require('./routes/specificBlogRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require("./routes/contactRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const dataCollectionRoutes = require("./routes/dataCollectionRoutes");
const teamRoutes = require('./routes/teamRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Import Models
const User = require("./models/userModel");
const Blog = require("./models/blogs"); 


// Handling CORS
// Allow requests from your frontend origin
// app.use(cors({
//   origin: 'http://localhost:5173', // replace with your frontend origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true // if using cookies or authorization headers
// }));
app.use(cors()) ; 

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Basic route
app.get("/", (req, res) => {
  res.send("Hello from Express server!");
});

//Routes for authorization(signup and login)
app.use('/api', authRoutes);
app.use('/api', blogRoutes);
app.use('/api/all-blogs', specificBlogRoutes); // handles /api/all-blogs/:id
app.use('/api/admin-dashboard', adminRoutes);
app.use("/api", contactRoutes);
app.use("/api", serviceRoutes);
app.use("/api", dataCollectionRoutes);
app.use('/api', teamRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to MongoDB") ; 
    console.log(process.env.MONGO_URL) ;
})
.catch((err) => console.error("MongoDB connection error:", err));


app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

