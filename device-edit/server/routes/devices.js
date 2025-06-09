const express = require('express');

const router = express.Router();
const Device = require('../models/Device');

router.get('/', async(req, res) => {
    const devices = await Device.find();
    res.json(devices);
});
　
router.post('/', async(req, res) => {
    const data = req.body;

    const existing = await Device.findOne({name: data.name});
    if(existing){
        await Device.updateOne({name: data.name}, data);
    }else{
        await Device.create(data);
    }

    res.status(200).json({message: '保存完了'});
});

module.exports = router;