const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user');

router.get('/', usersController.getList);

router.get('/:id', usersController.getUser);
router.post('/', usersController.addUser);
router.post('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

router.post('/:id', usersController.changeGear);

router.post('/search', usersController.search); //todo last

module.exports = router;
