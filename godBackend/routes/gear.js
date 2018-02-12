var express = require('express');
var router = express.Router();
var gearController = require('../controllers/gear')

router.get('/', gearController.getList);
router.get('/:id', gearController.getItem);
router.post('/', gearController.addItem);
router.post('/:id', gearController.updateItem);
router.delete('/:id', gearController.deleteItem);
module.exports = router;