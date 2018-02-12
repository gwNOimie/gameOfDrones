const mongoose = require('mongoose');
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
			resolve(DroneModel.find({}))
		})
	},
	getItem: (id) => {
		console.log('getItemById : ' + id);
		return new Promise((resolve, reject) => {
			resolve(DroneModel.find({ "_id": id }))
		})
	},
	addItem: (item) => {
		return new Promise((resolve, reject) => {
			console.log('addItem');
			const drone = new DroneModel(item);
			drone.save((err, result) => {
				if (err) {
					reject(err)
				};
				resolve(result)
			})

		})
	},
	updateItem: (id, item) => {
		return new Promise((resolve, reject) => {
			DroneModel.findByIdAndUpdate(id, item, (err, result) => {
				if (err) {
					reject(err)
				};
				resolve(result)
			})
		})
	},
	deleteItem: (id) => {
		return new Promise((resolve, reject) => {
			resolve(DroneModel.find({ "_id": id }).remove().exec())
		})
	}
}
