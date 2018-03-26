var bcrypt = require('bcrypt');

const userModel = require('../models/user');

module.exports = {
    getList: (req, res, next) => {
        userModel.getList().then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },

    getUser: (req, res, next) => {
        userModel.getUser(req.params.id).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },

    search: (req, res, next) => {
        //todo last
    },

    addUser: (req, res, next) => {
        let item = req.body;
        let salt = bcrypt.genSaltSync(10);
        item.password = bcrypt.hashSync(item.password, salt);

        userModel.addUser(item).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },

    updateUser: (req, res, next) => {
        userModel.updateUser(req.params.id, req.body).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },

    deleteUser: (req, res, next) => {
        userModel.deleteUser(req.params.id).then((result) => {
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
    }
};
