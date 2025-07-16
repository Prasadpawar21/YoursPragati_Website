const express = require('express');
const router = express.Router();
const { getTeamMembers , createTeamMember , getTeamMemberById , updateTeamMember ,deleteTeamMember } = require('../controllers/teamController');
const { upload } = require('../config/cloudinary'); // adjust path if needed


//Getting team members data on home page 
router.get('/team', getTeamMembers);


// POST route to add team member
router.post('/admin-dashboard/teams/add', upload.single('image'), createTeamMember);

//Get the teamData for admin dashboard
router.get('/admin-dashboard/teams', getTeamMembers);

// GET team member by ID
router.get('/admin-dashboard/teams/edit/:id',getTeamMemberById);

// PUT update team member
router.put('/admin-dashboard/teams/edit/:id', upload.single('image'),updateTeamMember);

// DELETE team member
router.delete('/admin-dashboard/teams/:id', deleteTeamMember);


module.exports = router;
