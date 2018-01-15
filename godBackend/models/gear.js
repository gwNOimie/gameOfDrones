//imports...
var mongoose = require('mongoose');

var gear = new mongoose.Schema({
	cost: { type: Number },
	level: { type: Number },
	source: { type: String },
	name: { type: String },
	description: { type: String }
});


var Gear = mongoose.model('gear',gear);

module.exports = {
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
			{"$group": {"_id": "$_id", "name": {"$first": "$name"}, "gold": {"$avg": "$gold"}} },
			{"$sort": {"gold":-1} }
			]))
		})
	},
	getItemById: (id) => {
		console.log('getItemById : ' + id);
		return new Promise((resolve, reject) => {			
			resolve(Gear.find({"_id": id}))
		})
	},
	getItemByName: (name) => {
		console.log('getItemByName : ' + name);
		return new Promise((resolve, reject) => {			
			resolve(Gear.find({"name": name}))
		})
	},
	addItem: (item) => {
		return new Promise((resolve, reject) => {
			console.log('addItem');
			item.signUpDate = new Date();
			item.gold = 0;
			var gear = new Gear(item);
			
			gear.save(item, function(err, result) {
				if (err) {
					reject(err)
				};
				resolve(result)
			})
			
		})
	},
	updateItem: (id, item) => {
		return new Promise((resolve, reject) => {
			Gear.findByIdAndUpdate(id, item, function(err, result) {
				if (err) {
					reject(err)
				};
				resolve(result)})
		})
	},
	deleteItem: (id) => {
		return new Promise((resolve, reject) => {
			resolve(Gear.find({"_id": id}).remove().exec())
		})
	}
}