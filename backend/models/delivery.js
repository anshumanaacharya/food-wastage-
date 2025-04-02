const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    food_item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'FoodItem' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    delivery_address: { type: String },
    status: { type: String, enum: ['pending', 'in_progress', 'delivered', 'canceled'], default: 'pending' },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Delivery', deliverySchema);
