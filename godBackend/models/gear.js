
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/godDatabase', { useMongoClient: true });
mongoose.Promise = global.Promise;

const AttackModel = require('./attack');

const GearSchema = new mongoose.Schema({
    name : { type: String },
    type : { type: String },
    description : { type: String },
    level : { type: Number },
    pictureId : { type: String },
    attacks : {
    		type:[ AttackModel.attackSchema()],
			validate: [arrayLimit, '{PATH} exceeds the limit of 2']
    }
});

function arrayLimit(val) {
    return val.length <= 2;
}

const GearModel = mongoose.model('gear', GearSchema);

module.exports = {
    gearSchema: () => GearSchema,
    getList: () => {
		return new Promise((resolve, reject) => {
			console.log('getList');
			resolve(Gear.find({}))
		})
	},
	getItemById: (id) => {
		console.log('getItemById : ' + id);
		return new Promise((resolve, reject) => {
			resolve(GearModel.find({ "_id": id }))
		})
	},
	getItemByName: (name) => {
		console.log('getItemByName : ' + name);
		return new Promise((resolve, reject) => {
			resolve(GearModel.find({ "name": name }))
		})
	},
	addItem: (item) => {
		return new Promise((resolve, reject) => {
			console.log('addItem');
			item.signUpDate = new Date();
			item.gold = 0;
			var gear = new GearModel(item);

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
            GearModel.findByIdAndUpdate(id, item, function (err, result) {
				if (err) {
					reject(err)
				};
				resolve(result)
			})
		})
	},
	deleteItem: (id) => {
		return new Promise((resolve, reject) => {
			resolve(GearModel.find({ "_id": id }).remove().exec())
		})
	}
}
