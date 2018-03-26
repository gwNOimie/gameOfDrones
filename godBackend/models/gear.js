const AttackModel = require('./attack');
const mongoose = require('mongoose');

const GearSchema = new mongoose.Schema({
	name : { type: String },
	type : { type: String },
	description : { type: String },
	cost: { type: Number },
	level : { type: Number },
	pictureId : { type: String },
	attacks : {
		type: [AttackModel.gearSchema()],
		validate: [arrayLimit, '{PATH} exceeds the limit of 2']
	}
});

function arrayLimit(val) {
	return val.length <= 2;
}

const Gear = mongoose.model('gear', GearSchema);

module.exports = {
    gearSchema: () => GearSchema,
    getList: () => {
        return new Promise((resolve, reject) => {
            console.log('getList');
            Gear.find({}, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        })
    },

    getGear: (id) => {
        return new Promise((resolve, reject) => {
            Gear.find({"_id": id}, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        })
    },

    addGear: (item) => {
        return new Promise((resolve, reject) => {
            console.log('addItem');
            const gear = new Gear(item);
            gear.save(item, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    },

    updateGear: (id, item) => {
        return new Promise((resolve, reject) => {
            Gear.findByIdAndUpdate(id, item, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    },

    deleteGear: (id) => {
        return new Promise((resolve, reject) => {
            Gear.findByIdAndRemove(id, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    }

};
