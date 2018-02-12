const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/godDatabase', { useMongoClient: true });
mongoose.Promise = global.Promise;
const GearModel = require('./gear')

const DroneSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    level: { type: Number },
    cost: { type: Number },
    speed: { type: Number },
    health: { type: Number },
    actionPoints: { type: Number },
    pictureId: { type: String },
    weaponLeft: { type: GearModel.gearSchema() },
    weaponRight: { type: GearModel.gearSchema() }
});

const DroneModel = mongoose.model('drone', DroneSchema);

function arrayLimit(val) {
    return val.length <= 2;
}

module.exports = {
    droneSchema: () => DroneSchema,

    getList: () => {
        return new Promise((resolve, reject) => {
            console.log('getList');
            DroneModel.find({}, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        })
    },
    getItem: (req, res, next) => {
        DroneModel.getItem(req.params.id).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },
    addItem: (req, res, next) => {
        DroneModel.addItem(req.body).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },
    updateItem: (req, res, next) => {
        DroneModel.updateItem(req.params.id, req.body).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    },
    deleteItem: (req, res, next) => {
        DroneModel.deleteItem(req.params.id).then((result) => {
            res.send(result)
        }).catch((error) => {
            console.log(error);
            res.status(500).send(error);
        })
    }
}
