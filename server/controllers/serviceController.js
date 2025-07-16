const Service = require("../models/servicesModel");

//Getting all services 
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ success: true, services });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// Adding new service
exports.createService = async (req, res) => {
  try {
    const { title, description, icon } = req.body;

    if (!title || !description || !icon) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newService = await Service.create({ title, description, icon });
    res.status(201).json({ message: 'Service created', service: newService });
  } catch (err) {
    console.error('Create Service Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET single service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json({ service });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// UPDATE service by ID
exports.updateServiceById = async (req, res) => {
  try {
    const { title, description, icon } = req.body;

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, icon },
      { new: true, runValidators: true }
    );

    if (!updatedService) return res.status(404).json({ message: 'Service not found' });

    res.status(200).json({ message: 'Service updated', service: updatedService });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// DELETE service by ID
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await Service.findByIdAndDelete(id);
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};