const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // location: {
    //     type: String,
    //     enum: ['Point'],
    //     default: 'Point',
    //     coordinates: { type: [Number], default: [0, 0] }
    // },
    rent_start: { type: Date },
    rent_end: { type: Date },
    rented_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['available', 'rented'], default: 'available' },
    date_added: { type: Date, default: Date.now }
});

itemSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Item', itemSchema);