const express = require('express');
const router = express.Router();
const fruitsController = require('../controller/fruits');
const mongocollections = require("../config/mongocollections");
const fruits = mongocollections.fruits;


router.post('/insert',async (req, resp) => {
    let data = await fruitsController.addFruits(req.body);
    resp.send(data)
});

router.get('/getdata',async (req, resp) => {
    let data = await fruitsController.findFruits(req.query.id)
    resp.send(data);
});

router.put('/update/:id',async (req, resp) => {
    let id = req.params.id
    let data = await fruitsController.updateFruits(req.body,id)
    resp.send(data)
});

router.delete('/deletedata/:id',async (req, resp) => {
    let data = await fruitsController.deleteFruits(req.params.id)
    resp.send(data);
});

module.exports = router;