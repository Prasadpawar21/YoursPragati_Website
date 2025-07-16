const express = require("express");
const router = express.Router();
const { submitContactForm , getUserContactActivity , getCurrentUser , getActivityById , updateActivity ,deleteActivity} = require("../controllers/contactController");
const verifyToken = require('../middlewares/verifyToken');

router.post("/contact", submitContactForm);     //For homepage - getIntouch form submission
router.get("/activities/contact", verifyToken ,  getUserContactActivity); // For Activity page - userdeails
router.get('/activities/user', verifyToken, getCurrentUser);  // For Activity page - getIntouch form details
router.get('/activities/edit/:id', getActivityById);  // GET single activity by ID
router.put('/activities/edit/:id', updateActivity);   // PUT update activity
router.delete('/activities/delete/:id', deleteActivity);   // DELETE /api/activities/delete/:id

module.exports = router;
