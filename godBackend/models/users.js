//imports...
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/godDatabase', { useMongoClient: true });
mongoose.Promise = global.Promise;

// model
let equippedGear = new mongoose.Schema({
	propeller: { type: String }, //gear_id
	engine: { type: String }, //gear_id
	shield: { type: String }, //gear_id
	weapons: [String] //gear_id
});
let drones = new mongoose.Schema({
	drone: { type: String }, //drone_id
	isCurrent: { trype: Boolean },
	equippedGears: equippedGear
});

let users = new mongoose.Schema({
	name: { type: String },
	password: { type: String },
	email: { type: String },
	signUpDate: { type: Date, default: Date.now },
	gold: { type: Number },
	totalGold: { type: Number },
	boughtGears: [String], //gear_id
	drones: [drones]
});


var User = mongoose.model('users', users);

module.exports = {
	getList: () => {
		return new Promise((resolve, reject) => {
			console.log('getList');
			User.find({}, function (err, result) {
				if (err) {
					reject(err);
				};
				resolve(result);
			})
		})
	},
	getItemById: (id) => {
		console.log('getItemById : ' + id);
		return new Promise((resolve, reject) => {
			User.find({ "_id": id }, function (err, result) {
				if (err) {
					reject(err);
				};
				resolve(result);
			})

		})
	},
	addItem: (item) => {
		return new Promise((resolve, reject) => {
			console.log('addItem');
			item.signUpDate = new Date();
			item.gold = 0;
			var user = new User(item);
			user.save(item, function (err, result) {
				if (err) {
					reject(err)
				};
				resolve(result)
			})
		})
	},
	updateItem: (id, item) => {
		return new Promise((resolve, reject) => {
			User.findByIdAndUpdate(id, item, function (err, result) {
				if (err) {
					reject(err)
				};
				resolve(result)
			})
		})
	},
	deleteItem: (id) => {
		return new Promise((resolve, reject) => {
			resolve(User.find({ "email": id }).remove().exec())
		})
	}
}


