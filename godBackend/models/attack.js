const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/godDatabase', { useMongoClient: true });
mongoose.Promise = global.Promise;

const BonusModel = require('./bonus');

const AttackSchema = new mongoose.Schema({
    name : { type: String },
    description : { type: String },
    damages : { type: Number },
    ammo : { type: Number },
    cooldown : { type: Number },
    accuracy : { type: Number },
    pictureId : { type: String },
    bonus : BonusModel.bonusSchema()
});

const AttackModel = mongoose.model('attack', AttackSchema);

module.exports = {
	attackSchema: () => AttackSchema,
    getList: (req, res, next) => {
        AttackModel.getList().then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },
    getItem: (req, res, next) => {
        AttackModel.getItem(req.params.id).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },
    addItem: (req, res, next) => {
        AttackModel.addItem(req.body).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },
    updateItem: (req, res, next) => {
        AttackModel.updateItem(req.params.id, req.body).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },
    deleteItem: (req, res, next) => {
        AttackModel.deleteItem(req.params.id).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    }
}