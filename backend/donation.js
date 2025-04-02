const express = require('express');
const router = express.Router();
const Donation = require('./models/donation'); // Assuming a Donation model exists

// Route to fetch donations
router.get('/donations', async (req, res) => {
    try {
        const donations = await Donation.find(); // Fetch all donations
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching donations' });
    }
});

// Route to accept a donation
router.post('/donations/accept/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Donation.findByIdAndUpdate(id, { status: 'accepted' }); // Update donation status
        res.status(200).json({ message: 'Donation accepted' });
    } catch (error) {
        res.status(500).json({ message: 'Error accepting donation' });
    }
});

// Route to reject a donation
router.post('/donations/reject/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Donation.findByIdAndUpdate(id, { status: 'rejected' }); // Update donation status
        res.status(200).json({ message: 'Donation rejected' });
    } catch (error) {
        res.status(500).json({ message: 'Error rejecting donation' });
    }
});

router.get('/donation-statistics', async (req, res) => {
    try {
        const totalDonationsReceived = await Donation.countDocuments({ status: 'accepted' });
        const totalDonationsMade = await Donation.countDocuments();
        const totalMessagesReceived = 50; // Placeholder for actual message count
        const totalFoodNotReceived = 20; // Placeholder for actual count
        const totalDonationsRejected = await Donation.countDocuments({ status: 'rejected' });

        res.json({
            totalDonationsReceived,
            totalDonationsMade,
            totalMessagesReceived,
            totalFoodNotReceived,
            totalDonationsRejected
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistics' });
    }
});

module.exports = router;