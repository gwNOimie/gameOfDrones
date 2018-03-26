const express = require('express');
const router = express.Router();
const dronesController = require('../controllers/drone');

router.get('/', dronesController.getList);
router.get('/:id', dronesController.getDrone);
router.post('/', dronesController.addDrone);
router.post('/:id', dronesController.updateDrone);
router.delete('/:id', dronesController.deleteDrone);

module.exports = router;
