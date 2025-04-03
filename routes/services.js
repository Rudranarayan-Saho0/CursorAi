const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const auth = require('../middleware/auth');

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new service (protected route)
router.post('/', auth, async (req, res) => {
    const service = new Service({
        title: req.body.title,
        description: req.body.description,
        icon: req.body.icon
    });

    try {
        const newService = await service.save();
        res.status(201).json(newService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update service (protected route)
router.put('/:id', auth, async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });

        Object.assign(service, req.body);
        const updatedService = await service.save();
        res.json(updatedService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete service (protected route)
router.delete('/:id', auth, async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: 'Service not found' });

        await service.remove();
        res.json({ message: 'Service deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 