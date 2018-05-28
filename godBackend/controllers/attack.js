const attackModel = require('../models/attack');

module.exports = {
    attackSchema: () => AttackSchema,
    getList: (req, res, next) => {
        attackModel.getList().then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },

    getAttack: (req, res, next) => {
        attackModel.getAttack(req.params.id).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },

    addAttack: (req, res, next) => {
        attackModel.addAttack(req.body).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },

    updateAttack: (req, res, next) => {
        attackModel.updateAttack(req.params.id, req.body).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },

    deleteAttack: (req, res, next) => {
        attackModel.deleteAttack(req.params.id).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    }
}