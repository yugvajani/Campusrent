const express = require('express');
const User = require('../models/User');
const Item = require('../models/Item');
const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).send(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.send(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.send(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        Object.assign(item, req.body);
        await item.save();
        res.send(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
