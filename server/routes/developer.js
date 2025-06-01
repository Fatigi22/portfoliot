import express from 'express';
import Developer from '../models/Developer.js';

const router = express.Router();

// Get developer info
router.get('/', async (req, res) => {
  try {
    // Assuming there's only one developer profile in the database
    const developer = await Developer.findOne();
    
    if (!developer) {
      return res.status(404).json({ message: 'Developer profile not found' });
    }
    
    res.status(200).json(developer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create or update developer info
router.post('/', async (req, res) => {
  try {
    const {
      name,
      title,
      bio,
      email,
      phone,
      location,
      skills,
      socialLinks,
      projects
    } = req.body;

    // Find if a developer profile already exists
    const existingDeveloper = await Developer.findOne();
    
    if (existingDeveloper) {
      // Update existing profile
      existingDeveloper.name = name || existingDeveloper.name;
      existingDeveloper.title = title || existingDeveloper.title;
      existingDeveloper.bio = bio || existingDeveloper.bio;
      existingDeveloper.email = email || existingDeveloper.email;
      existingDeveloper.phone = phone || existingDeveloper.phone;
      existingDeveloper.location = location || existingDeveloper.location;
      existingDeveloper.skills = skills || existingDeveloper.skills;
      existingDeveloper.socialLinks = socialLinks || existingDeveloper.socialLinks;
      existingDeveloper.projects = projects || existingDeveloper.projects;
      
      await existingDeveloper.save();
      return res.status(200).json(existingDeveloper);
    }
    
    // Create new profile
    const newDeveloper = new Developer({
      name,
      title,
      bio,
      email,
      phone,
      location,
      skills,
      socialLinks,
      projects
    });
    
    await newDeveloper.save();
    res.status(201).json(newDeveloper);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;