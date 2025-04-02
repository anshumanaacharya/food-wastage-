const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    foodItem: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
});

donationSchema.methods.acceptDonation = function() {
    this.status = 'accepted';
    return this.save();
};

donationSchema.methods.rejectDonation = function() {
    this.status = 'rejected';
    return this.save();
};

module.exports = mongoose.model('Donation', donationSchema);
