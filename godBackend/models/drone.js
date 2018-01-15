const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/godDatabase', { useMongoClient: true });
mongoose.Promise = global.Promise;

const GearModel = require('./gear');

const DroneSchema = new mongoose.Schema({
	name: { type: String },
	description: { type: String },
	level: { type: Number },
	cost: { type: Number },
	speed: { type: Number },
	health: { type: Number },
	actionPoints: { type: Number },
	pictureId: { type: String },
	weapons: [GearModel.gearSchema]
});

const DroneModel = mongoose.model('drone', DroneSchema);

module.exports = {
	droneSchema: () => DroneSchema,

	getList: () => {
		return new Promise((resolve, reject) => {
			DroneModel.find((error, results) => {
				if (error) {
					console.log(error);
					reject(error);
				}
				console.log(results);
				resolve(results);
			})
		})
	},
	getItem: (id) => {
		return new Promise((resolve, reject) => {
			DroneModel.findById(id, (error, result) => {
				if (error) {
					console.log(error);
					reject(error);
				}
				console.log(result)
				resolve(result);
			})
		})
	},
	addItem: (object) => {
		return new Promise((resolve, reject) => {
			const newDrone = new DroneModel(object);
			newDrone.save((error, result) => {
				if (error) {
					console.log(error);
					reject(error);
				}
				console.log(result)
				resolve(result);
			})
		})
	},
	updateItem: (id, object) => {
		delete object._id;
		return new Promise((resolve, reject) => {
			DroneModel.findByIdAndUpdate(id, object, (error, result) => {
				if (error) {
					console.log(error);
					reject(error);
				}
				console.log(result)
				resolve(result);
			});
		})
	},
	deleteItem: (id) => {
		return new Promise((resolve, reject) => {
			DroneModel.findByIdAndRemove(id, (error, result) => {
				if (error) {
					console.log(error);
					reject(error);
				}
				console.log(result)
				resolve(result);
			});
		})
	}
}