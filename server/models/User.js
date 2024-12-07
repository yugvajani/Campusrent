const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const secret = 'your_jwt_secret_key';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    // location: {
    //     type: String,
    //     enum: ['Point'],
    //     default: 'Point',
    //     coordinates: { type: [Number], default: [0, 0] }
    // },
    date_joined: { type: Date, default: Date.now }
});

// userSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

// userSchema.statics.findByCredentials = async function (email, password) {
//     const user = await this.findOne({ email });
//     if (!user) throw new Error('Invalid credentials');

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) throw new Error('Invalid credentials');

//     return user;
// };

// userSchema.methods.generateAuthToken = function () {
//     return jwt.sign({ id: this._id, email: this.email }, JWT_SECRET, { expiresIn: '1h' });
// };

// userSchema.methods.generatePasswordResetToken = function () {
//     const resetToken = crypto.randomBytes(20).toString('hex');
//     this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
//     this.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//     return resetToken;
// };

userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    secret
}
