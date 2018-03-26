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
    getDrone: (req, res, next) => {
        droneModel.getDrone(req.params.id).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },
    addDrone: (req, res, next) => {
        droneModel.addDrone(req.body).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },
    updateDrone: (req, res, next) => {
        droneModel.updateDrone(req.params.id, req.body).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },
    deleteDrone: (req, res, next) => {
        droneModel.deleteDrone(req.params.id).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    }
}
