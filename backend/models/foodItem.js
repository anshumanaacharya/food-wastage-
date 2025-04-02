const mongoose = require('mongoose');

const foodItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    wastage_date: { type: Date },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FoodItem', foodItemSchema);
