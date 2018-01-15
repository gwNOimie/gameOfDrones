var crypto = require('crypto');

const userModel = require('../models/users');

module.exports = {
  getList: (req, res, next) => {
    userModel.getList().then((result) => {
      res.send(result)
    }).catch((error) => {
      console.log(error);
      res.status(500).send(error);
    })
  },
  getItemById: (req, res, next) => {
    userModel.getItemById(req.params.id).then((result) => {
      res.send(result)
    }).catch((error) => {
      console.log(error);
      res.status(500).send(error);
    })
  },
  search: (req, res, next) => {
      //todo last
  },
  addItem: (req, res, next) => {
    var item = req.body;
    console.log(item.password)
    var cipher = crypto.createCipher('sha256', 'l5JmP+G0/1zB%;r8B8?2?2pcqGcL^3');
    var crypted = cipher.update(item.password, 'utf8', 'hex');
    crypted += cipher.final('hex');
    item.password = crypted;
    console.log(item.password);
    //Utils.prototype.hashPW = function(item.password) {
    //  return crypto.createHash('sha256').update(item.password).digest('base64').toString();
    //}

    userModel.addItem(item).then((result) => {
      res.send(result)
    }).catch((error) => {
      console.log(error);
      res.status(500).send(error);
    })
  },
  changeGear: (req, res, next) => {
    userModel.changeGear(req.params.id, req.body).then((result) => {
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
