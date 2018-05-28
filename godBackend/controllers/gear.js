const gearModel = require('../models/gear');

module.exports = {
    getList: (req, res, next) => {
        gearModel.getList().then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },
    getGear: (req, res, next) => {
        gearModel.getGear(req.params.id).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },
    addGear: (req, res, next) => {
        gearModel.addGear(req.body).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },
    updateGear: (req, res, next) => {
        gearModel.updateGear(req.params.id, req.body).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },
    deleteGear: (req, res, next) => {
        gearModel.deleteGear(req.params.id).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    }
};
