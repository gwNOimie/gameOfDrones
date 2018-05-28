const mongoose = require('mongoose');
const GearModel = require('./gear');

const DroneSchema = new mongoose.Schema({
	name: { type: String, required : true},
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

const Drone = mongoose.model('drone', DroneSchema);

function arrayLimit(val) {
	return val.length <= 2;
}

module.exports = {
	droneSchema: () => DroneSchema,
    getList: () => {
        return new Promise((resolve, reject) => {
            console.log('getList');
            Drone.find({}, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        })
    },
    getDrone: (id) => {
        return new Promise((resolve, reject) => {
            Drone.find({ "_id": id }, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })

        })
    },
    addDrone: (item) => {
        return new Promise((resolve, reject) => {
        	const drone = new Drone(item);
            drone.save((err, result)=> {
            	if (err) {
            		reject(err)
				}
				resolve(result)
			})

        })
    },

    updateDrone: (id, item) => {
        return new Promise((resolve, reject) => {
            Drone.findByIdAndUpdate(id, item, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve("modified");
            })
        })
    },

    deleteDrone: (id) => {
        return new Promise((resolve, reject) => {
            Drone.findByIdAndRemove(id, (err, result) => {
                if (err){
                    reject(err)
                }
                resolve(result)
            })
        })
    }
};
