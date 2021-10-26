const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    order_id: { type: String, required: true },
    item_name: { type: String, required: true },
    cost: { type: Number, required: true },
    order_date: { type: Date, required: true },
    delivery_date: { type: Date, required: true }

}, { timestamps: true });
const Order = mongoose.model('order', orderSchema, 'order')
module.exports = Order;