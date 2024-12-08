const express = require('express');
const { User}  = require('../models/User');
const Item = require('../models/Item');
const userMiddleware = require("../middleware/userMiddleware");
const router = express.Router();

// Get all unrented items (route: api/items/available/items)
// all 'available' items
router.get('/available/items', async (req, res) => {
    try {
        const items = await Item.find({ status: 'available' });
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: `error fetching available items`, err });
    }
});

// Get all rented items (route: /api/items/rented/items)
// "Rented" done
router.get('/rented/items', async (req, res) => {
    try {
        const items = await Item.find({ status: 'rented' });
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: `error fetching rented items`, err });
    }
});

// Get all items (route: /api/items)
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: `error fetching all items`, err });
    }
});

// Get all items by owner id (route: /api/items/owned)
// ALL ITEMS OWNED BY ME
router.get('/owned',userMiddleware, async (req, res) => {
    const { username } = req.headers;
    try {
        const user = await User.findOne({ username});
        if (!user) return res.status(404).json({ message: "User not found" });
        
        const items = await Item.find({ owner: user._id });
        res.status(200).json({ message: `All items owned by ${username}`, data: items });
    } catch (err) {
        res.status(500).json({ message: `error fetching all the item owned by ${username}`, err });
    }
});

// Get all the lend items by owner id (route: /api/items/lend)
// RENTED ITEMS UPLOADED MY ME
router.get('/lend',userMiddleware, async (req, res) => {
    const { username } = req.headers;
    try {
        const user = await User.findOne({ username});
        console.log("user: "+ user)
        if (!user) return res.status(404).json({ message: "User not found" });
        
        const items = await Item.find({ owner: user._id, status: 'rented' });
        res.status(200).json({ message: `All items lent by ${username}`, data: items });
        
    } catch (err) {
        res.status(500).json({ message: `error fetching lent items by ${username}`, err });
    }
});

// Get all the rented items rented by user id (route: /api/items/rented)
// YOU RENTED THESE ITEMS
router.get('/rented',userMiddleware, async (req, res) => {
    const { username } = req.headers;
    try {
        const user = await User.findOne({ username});
        if (!user) return res.status(404).json({ message: "User not found" });
        
        const items = await Item.find({ status : 'rented', rented_by: user._id });
        res.status(200).json({ message: `All items rented by ${username}`, data: items });
    } catch (err) {
        res.status(500).json({ message: `error fetching items rented by ${username}`, err });
    }
});

// Get item by id (route: /api/items/:id)
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('owner', 'name');
        res.status(200).json({message: `Item found ${item._id}`, data: item});
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Create a new item (route: /api/items)
router.post('/',userMiddleware, async (req, res) => {
    const { username } = req.headers;
    const { name, description, price, stock, category } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });
        const item = new Item({ name, description, price, stock, category, owner: user._id });
        await item.save();
        res.status(200).json({ message: `Item created successfully ${item._id}`, data: item });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Update an item by id (route: /api/items/:id)
router.put('/:id',userMiddleware, async (req, res) => {
    const { username } = req.headers;
    const { name, description, price, stock, category } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });
        const item = await Item.findByIdAndUpdate(req.params.id, { name, description, price, stock, category }, { new: true });
        res.status(200).json({ message: `Item updated successfully ${item._id}`, data: item });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Delete an item by id (route: /api/items/:id)
router.delete('/:id',userMiddleware, async (req, res) => {
    const { username } = req.headers;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });
        const item = await Item.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: `Item deleted successfully ${item._id}`, data: item });
    } catch (err) {
        res.status(500).json({ message: `error deleting the item ${item._id}`, err });
    }
});

// Rent an item by id (route: /api/items/rent/:id)
// USER CAN RENT BY ID
router.put('/rent/:id',userMiddleware, async (req, res) => {
    const { rent_start, rent_end } = req.body;
    const { username } = req.headers;

    if (!rent_start || !rent_end || !username) return res.status(400).json({ message: "Missing renting start date or end date" });

    try {
        const user = User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });

        const item = await Item.findByIdAndUpdate(req.params.id, { rent_start, rent_end, rented_by: user._id, status: 'rented' }, { new: true });
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.status(200).json({ message: `Item rented successfully ${item._id}`, data: item });
    } catch (err) {
        res.status(500).json({ message: `Error renting the item`, err });
    }
});

// finish a renting by id (route: /api/items/finish/:id)
router.put('/finish/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, { rent_start: undefined, rent_end: undefined, rented_by: undefined, status: 'available'}, { new: true });
        res.status(200).json({ message: `Item returned successfully ${item._id}`, data: item });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;
