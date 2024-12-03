const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    location: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        coordinates: { type: [Number], default: [0, 0] }
    },
    date_joined: { type: Date, default: Date.now }
});

userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User', userSchema);