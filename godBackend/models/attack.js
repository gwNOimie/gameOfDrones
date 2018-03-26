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

const Attack = mongoose.model('attack', AttackSchema);

module.exports = {
    gearSchema: () => GearSchema,
    getList: () => {
        return new Promise((resolve, reject) => {
            console.log('getList');
            Attack.find({}, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        })
    },

    getAttack: (id) => {
        return new Promise((resolve, reject) => {
            Attack.find({"_id": id}, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        })
    },

    addAttack: (item) => {
        return new Promise((resolve, reject) => {
            console.log('addItem');
            const attack = new Attack(item);
            attack.save(item, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    },

    updateAttack: (id, item) => {
        return new Promise((resolve, reject) => {
            Attack.findByIdAndUpdate(id, item, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    },

    deleteAttack: (id) => {
        return new Promise((resolve, reject) => {
            Attack.findByIdAndRemove(id, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    }

};