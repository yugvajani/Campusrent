const express = require('express');
const Item = require('../models/Item');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userMiddleware = require("../middleware/userMiddleware");
const { secret, User } = require("../models/User")

router.post('/register', async (req, res) => {
    const userdata = req.body;

    if (!userdata.name || !userdata.email || !userdata.username || !userdata.password) {
        return res.status(400).json({
            msg: "Please give all the required fields",
            data: null
        })
    }
    const exists = await User.findOne({ username: userdata.username })

    if (!exists) {

        const hashedpassword = await bcrypt.hash(userdata.password, 10)
        userdata.password = hashedpassword;
        const user = new User(userdata)

        const data = await user.save();
        res.status(200).json({
            msg: "User created successfully",
            data: data
        })
    }
    else {
        res.status(400).json({
            msg: "User already exists",
            data: null
        })
    }

});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            msg: 'Both username and password are required',
            data: null
        });
    }
    const user = await User.findOne({ username: username });
    if (user) {

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (isValidPassword) {
            const token = jwt.sign({ username }, secret);
            res.status(200).json({
                msg: "User logged in",
                data: token
            })
        }
        else {
            return res.status(401).json({
                msg: "Incorrect Password",
                data: null
            })
        }
    }
    else {
        res.status(404).json({
            msg: "Incorrect credentials",
            data: null
        })
    }
});


router.get("/profile", userMiddleware, async (req, res) => {
    const username = req.headers.username;

    try {
        const user = await User.findOne({ username: username });

        return res.status(200).json({

            msg: "User Details",
            data: user
        })

    }
    catch (err) {
        return res.status(500).json({
            msg: "Server error in /profile",
            data: err
        })
    }
})


router.put('/profile', userMiddleware, async (req, res) => {
    const username = req.headers.username;
    const userdata = req.body;

    try {
        const user = await User.findOne({ username: username });

        if (!userdata) {
            return res.status(400).json({
                msg: "Provide data to update",
                data: null
            })
        }
        if (userdata.username || userdata.password) {
            return res.status(400).json({
                msg: "Username and password cannot be updated",
                data: null
            });
        }

        await user.updateOne(userdata);
        return res.status(200).json({
            msg: "User has been updated",
            data: userdata
        })

    }
    catch (err) {
        return res.status(500).json({
            msg: "Server error in /profile",
            data: err
        })
    }

});

router.delete('/profile', userMiddleware, async (req, res) => {
    const username = req.headers.username;

    try {
        const user = await User.findOne({ username: username })

        await user.deleteOne({ username: username })
        return res.status(200).json({
            msg:"User Deleted",
            data:null
        })
    }
    catch (err) {
        return res.status(500).json({
            msg: "Error deleting user in /profile",
            data: err
        })
    }
})



module.exports = router;