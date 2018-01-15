var express = require('express');
var router = express.Router();
var gearModel = require('../models/gear')

router.get('/', gearModel.getList);
router.get('/sortByGold', gearModel.getFilteredList)
router.get('/id/:id', gearModel.getItemById);
router.get('/pseudo/:pseudo', gearModel.getItemByName);
router.post('/', gearModel.addItem);
router.post('/update/:id', gearModel.updateItem);
router.delete('/:id', gearModel.deleteItem);

module.exports = router;