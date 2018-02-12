const express = require('express');
const router = express.Router();
const dronesController = require('../controllers/drone');

router.get('/', dronesController.getList);
router.get('/:id', dronesController.getItem);
router.post('/', dronesController.addItem);
router.post('/:id', dronesController.updateItem);
router.delete('/:id', dronesController.deleteItem);

module.exports = router;
