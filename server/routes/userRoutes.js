const express = require('express');
const Item = require('../models/Item');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userMiddleware = require("../middleware/userMiddleware");
const { secret, User } = require("../models/User")

router.post('/register', async (req, res) => {
    const { name, email, username, password } = req.body;

    if (!name || !email || !username || !password) {
        return res.status(400).json({
            msg: "Please give all the required fields",
            data: null
        })
    }
    const exists = await User.findOne({ username: username })

    if (!exists) {

        const hashedpassword = await bcrypt.hash(password, 10)

        const user = new User({
            username, password: hashedpassword, name, email
        })

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
        else{
            return res.status(401).json({
                msg:"Incorrect Password",
                data:null
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


//testing route for checking auth
// router.get('/temp', userMiddleware, async (req, res) => {

//     const userData = await User.find();
//     return res.json({
//         msg: "here are all the users",
//         data: userData
//     })

// })


module.exports = router;