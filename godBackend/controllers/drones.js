const userModel = require('../models/drone');

module.exports = {
  getList: (req, res, next) => {
    userModel.getList().then((result) => {
      res.send(result)
    }).catch((error) => {
      console.log(error);
      res.status(500).send(error);
    })
  },
  getItem: (req, res, next) => {
    userModel.getItem(req.params.id).then((result) => {
      res.send(result)
    }).catch((error) => {
      console.log(error);
      res.status(500).send(error);
    })
  },
  addItem: (req, res, next) => {
    userModel.addItem(req.body).then((result) => {
      res.send(result)
    }).catch((error) => {
      console.log(error);
      res.status(500).send(error);
    })
  },
  updateItem: (req, res, next) => {
    userModel.updateItem(req.params.id, req.body).then((result) => {
      res.send(result)
    }).catch((error) => {
      console.log(error);
      res.status(500).send(error);
    })
  },
  deleteItem: (req, res, next) => {
    userModel.deleteItem(req.params.id).then((result) => {
      res.send(result)
    }).catch((error) => {
      console.log(error);
      res.status(500).send(error);
    })
  }
}
