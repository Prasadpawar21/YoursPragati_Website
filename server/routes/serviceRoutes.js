const express = require("express");
const router = express.Router();
const { getAllServices , createService } = require("../controllers/serviceController");
const protect = require('../middlewares/protect');
const serviceController = require('../controllers/serviceController');

// GET all services
router.get("/services", getAllServices);

// POST create a new service
router.post('/admin-dashboard/services/create', protect, createService);

//Get a single service wiht id
router.get('/admin-dashboard/services/edit/:id', serviceController.getServiceById);

//Update sigle service by id 
router.put('/admin-dashboard/services/edit/:id', serviceController.updateServiceById);

// Delete a service by ID
router.delete('/admin-dashboard/services/:id', protect, serviceController.deleteService);

module.exports = router;
