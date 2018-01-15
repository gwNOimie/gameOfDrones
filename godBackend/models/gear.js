
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/godDatabase', { useMongoClient: true });
mongoose.Promise = global.Promise;

const AttackModel = require('./attack');

module.exports = {
	gearSchema = new mongoose.Schema({
		name : { type: String },
		type : { type: String },
		description : { type: String },
		level : { type: Number },
		pictureId : { type: String },
		attacks : [AttackModel.attackSchema]
	}),

	getList: () => {
		return new Promise((resolve, reject) => {
			console.log('getList');
			resolve(Gear.find({}))
		})
	},
	getFilteredList: () => {
		return new Promise((resolve, reject) => {
			console.log('getFilteredList');
			resolve(Gear.aggregate([
				{ "$group": { "_id": "$_id", "name": { "$first": "$name" }, "gold": { "$avg": "$gold" } } },
				{ "$sort": { "gold": -1 } }
			]))
		})
	},
	getItemById: (id) => {
		console.log('getItemById : ' + id);
		return new Promise((resolve, reject) => {
			resolve(Gear.find({ "_id": id }))
		})
	},
	getItemByName: (name) => {
		console.log('getItemByName : ' + name);
		return new Promise((resolve, reject) => {
			resolve(Gear.find({ "name": name }))
		})
	},
	addItem: (item) => {
		return new Promise((resolve, reject) => {
			console.log('addItem');
			item.signUpDate = new Date();
			item.gold = 0;
			var gear = new Gear(item);

			gear.save(item, function (err, result) {
				if (err) {
					reject(err)
				};
				resolve(result)
			})

		})
	},
	updateItem: (id, item) => {
		return new Promise((resolve, reject) => {
			Gear.findByIdAndUpdate(id, item, function (err, result) {
				if (err) {
					reject(err)
				};
				resolve(result)
			})
		})
	},
	deleteItem: (id) => {
		return new Promise((resolve, reject) => {
			resolve(Gear.find({ "_id": id }).remove().exec())
		})
	}
}
