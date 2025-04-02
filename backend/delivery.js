const express = require('express');
const router = express.Router();

// Mock database for demonstration purposes
let deliveries = [];

// POST /deliveries - Create a new delivery request
router.post('/deliveries', (req, res) => {
    const newDelivery = req.body;
    deliveries.push(newDelivery);
    res.status(201).json(newDelivery);
});

// GET /deliveries - Retrieve all delivery requests
router.get('/deliveries', (req, res) => {
    res.json(deliveries);
});

// PUT /deliveries/:id - Update the status of a delivery request
router.put('/deliveries/:id', (req, res) => {
    const { id } = req.params;
    const updatedDelivery = req.body;
    deliveries = deliveries.map(delivery => (delivery.id === id ? updatedDelivery : delivery));
    res.json(updatedDelivery);
});

// DELETE /deliveries/:id - Delete a delivery request
router.delete('/deliveries/:id', (req, res) => {
    const { id } = req.params;
    deliveries = deliveries.filter(delivery => delivery.id !== id);
    res.status(204).send();
});

module.exports = router;
