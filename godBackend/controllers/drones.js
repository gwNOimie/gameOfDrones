const droneModel = require('../models/drone');

module.exports = {
  getList: (req, res, next) => {
    droneModel.getList().then((result) => {
      res.send(result)
    }).catch((error) => {
      console.log(error);
      res.status(500).send(error);
    })
  },
  getItem: (req, res, next) => {
    droneModel.getItem(req.params.id).then((result) => {
      res.send(result)
    }).catch((error) => {
      console.log(error);
      res.status(500).send(error);
    })
  },
  addItem: (req, res, next) => {
    droneModel.addItem(req.body).then((result) => {
      res.send(result)
    }).catch((error) => {
      console.log(error);
      res.status(500).send(error);
    })
  },
  updateItem: (req, res, next) => {
    droneModel.updateItem(req.params.id, req.body).then((result) => {
      res.send(result)
    }).catch((error) => {
      console.log(error);
      res.status(500).send(error);
    })
  },
  deleteItem: (req, res, next) => {
    droneModel.deleteItem(req.params.id).then((result) => {
      res.send(result)
    }).catch((error) => {
      console.log(error);
      res.status(500).send(error);
    })
  }
}
