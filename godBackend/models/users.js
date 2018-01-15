//imports...
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/godDatabase', { useMongoClient: true });
mongoose.Promise = global.Promise;

// model
var users = new mongoose.Schema({
  pseudo: { type: String }, //match: /^[a-zA-Z0-9-_]+$/
  password: { type: String }, //match: /^[a-zA-Z0-9-_]+$/
  email: { type: String }, //match: /^[a-zA-Z0-9-_]+$/
  signUpDate: { type: Date, default: Date.now },
  gold: { type: Number },
  totalGold: { type: Number }

});
var User = mongoose.model('users',users);

module.exports = {
	getList: () => {
		return new Promise((resolve, reject) => {
			console.log('getList');
			User.find({}, function(err, result) {
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
			User.find({"_id": id}, function(err, result) {
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
			user.save(item, function(err, result) {
				if (err) {
					reject(err)
				};
				resolve(result)
			})
		})
	},
	updateItem: (id, item) => {
		return new Promise((resolve, reject) => {
			User.findByIdAndUpdate(id, item, function(err, result) {
				if (err) {
					reject(err)
				};
				resolve(result)})
		})
	},
	deleteItem: (id) => {
		return new Promise((resolve, reject) => {
			resolve(User.find({"email": id}).remove().exec())
		})
	}
}


