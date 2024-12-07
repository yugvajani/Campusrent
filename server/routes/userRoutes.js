const express = require('express');
const crypto = require('crypto');
const User = require('../models/User');
const Item = require('../models/Item');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const router = express.Router();

const CLIENT_ID = 'your_google_client_id';
const CLIENT_SECRET = 'your_google_client_secret';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = 'your_google_refresh_token';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

router.post('/register', async (req, res) => {
    const { name, email, username, password } = req.body;

    if (!name || !email || !username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        const newUser = new User({ name, email, username, password });
        await newUser.save();

        const token = newUser.generateAuthToken();
        res.status(201).json({ token, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const user = await User.findByCredentials(email, password);
        const token = user.generateAuthToken();
        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const sendEmail = async (to, subject, text) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'your_email@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token,
            },
        });

        const mailOptions = {
            from: 'Your App <your_email@gmail.com>',
            to,
            subject,
            text,
        };

        await transport.sendMail(mailOptions);
    } catch (error) {
        throw new Error('Error sending email');
    }
};

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const resetToken = user.generatePasswordResetToken();
        await user.save();

        const resetURL = `http://yourapp.com/reset-password/${resetToken}`;
        const message = `You are receiving this email because you (or someone else) requested a password reset. Please click the following link to reset your password: ${resetURL}`;

        await sendEmail(email, 'Password Reset Request', message);

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    try {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;