const express = require('express');
const router = express.Router();
const gearController = require('../controllers/gear');

router.get('/', gearController.getList);
router.get('/:id', gearController.getGear);
router.post('/', gearController.addGear);
router.post('/:id', gearController.updateGear);
router.delete('/:id', gearController.deleteGear);

module.exports = router;