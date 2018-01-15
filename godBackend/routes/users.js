const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getList);
router.get('/:id', usersController.getItemById);
router.post('/search', usersController.search); //todo last

router.post('/', usersController.addItem);
router.post('/:id', usersController.updateItem);
router.delete('/:id', usersController.deleteItem);

module.exports = router;
