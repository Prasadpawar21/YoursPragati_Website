const TeamMember = require('../models/TeamModel');

// GET all team members
exports.getTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.find();
    res.status(200).json(members);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// POST - Create a new team member
// exports.createTeamMember = async (req, res) => {
//   try {
//     const { name, role, twitter, instagram, linkedin } = req.body;

//     if (!req.file || !req.file.path) {
//       return res.status(400).json({ message: 'Image is required' });
//     }

//     const newMember = new TeamMember({
//       name,
//       role,
//       imageUrl: req.file.path,
//       twitter,
//       instagram,
//       linkedin
//     });

//     const savedMember = await newMember.save();
//     res.status(201).json({ message: 'Team member added successfully', member: savedMember });
//   } catch (error) {
//     console.error('Error creating team member:', error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// };

exports.createTeamMember = async (req, res) => {
  try {
    const { name, role, twitter, instagram, linkedin, facebook } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const newMember = new TeamMember({
      name,
      role,
      imageUrl: req.file.path,
      twitter,
      instagram,
      linkedin,
      facebook  // <- added facebook field here
    });

    const savedMember = await newMember.save();
    res.status(201).json({ message: 'Team member added successfully', member: savedMember });
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};



// Get a single team member by ID
exports.getTeamMemberById = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Team member not found' });

    res.status(200).json(member);
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT - Update a team member
exports.updateTeamMember = async (req, res) => {
  try {
    const { name, role, instagram, twitter, linkedin ,facebook } = req.body;
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Team member not found' });

    // Update fields
    member.name = name || member.name;
    member.role = role || member.role;
    member.instagram = instagram || '';
    member.twitter = twitter || '';
    member.linkedin = linkedin || '';
    member.facebook = facebook || '' ; 

    // Handle image if new one is uploaded
    if (req.file) {
      // Optional: Delete old image if stored locally
      if (member.imageUrl && member.imageUrl.startsWith('uploads/')) {
        fs.unlink(path.join(__dirname, '..', member.imageUrl), err => {
          if (err) console.warn('Old image deletion failed:', err);
        });
      }
      member.imageUrl = req.file.path.replace(/\\/g, '/'); // Save new path
    }

    await member.save();
    res.status(200).json({ message: 'Team member updated successfully' });
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// DELETE a team member by ID
exports.deleteTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Team member not found' });

    // Optional: delete old image if stored locally
    if (member.imageUrl && member.imageUrl.startsWith('uploads/')) {
      const imagePath = path.join(__dirname, '..', member.imageUrl);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.warn('Failed to delete image:', err.message);
        }
      });
    }

    // Delete the document from MongoDB
    await TeamMember.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Team member deleted successfully' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ message: 'Server error while deleting team member' });
  }
};