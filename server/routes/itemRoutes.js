const express = require('express');
const { User}  = require('../models/User');
const Item = require('../models/Item');
const router = express.Router();

// Get all unrented items (route: /api/items/rent)
router.get('/rent', async (req, res) => {
    try {
        const items = await Item.find({ status: 'available' });
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Get all rented items (route: /api/items/rented)
router.get('/rented', async (req, res) => {
    try {
        const items = await Item.find({ status: 'rented' });
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Get all items (route: /api/items)
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});


// Get all items by owner id (route: /api/items/owned)
router.get('/owned', async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ username});
        if (!user) return res.status(404).json({ message: "User not found" });
        
        const items = await Item.find({ owner: user._id });
        res.status(200).json({ message: `All items owned by ${username}`, data: items });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Get all the lend items by owner id (route: /api/items/lend)
router.get('/lend', async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ username});
        if (!user) return res.status(404).json({ message: "User not found" });
        
        const items = await Item.find({ owner: user._id, status: 'rented' });
        res.status(200).json({ message: `All items lent by ${username}`, data: items });
        
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Get all the rented items rented by user id (route: /api/items/rented)
router.get('/rented', async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ username});
        if (!user) return res.status(404).json({ message: "User not found" });
        
        const items = await Item.find({ status : 'rented', rented_by: user._id });
        res.status(200).json({ message: `All items rented by ${username}`, data: items });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Get item by id (route: /api/items/:id)
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('owner', 'name email');
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Create a new item (route: /api/items)
router.post('/', async (req, res) => {
    const { name, description, price, stock, category, owner} = req.body;
    try {
        const item = new Item({ name, description, price, stock, category, owner });
        await item.save();
        res.status(201).json({ message: `Item created successfully ${item._id}`, data: item });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Update an item by id (route: /api/items/:id)
router.put('/:id', async (req, res) => {
    const { name, description, price, stock, category, owner } = req.body;
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, { name, description, price, stock, category, owner }, { new: true });
        res.status(200).json({ message: `Item updated successfully ${item._id}`, data: item });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Delete an item by id (route: /api/items/:id)
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: `Item deleted successfully ${item._id}`, data: item });
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// Rent an item by id (route: /api/items/rent/:id)
router.put('/rent/:id', async (req, res) => {
    const { rent_start, rent_end, rented_by } = req.body;
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, { rent_start, rent_end, rented_by, status: 'rented' }, { new: true });
        res.status(200).json({ message: `Item rented successfully ${item._id}`, data: item });
    } catch (err) {
        res.status(500).json({ message: err });
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

