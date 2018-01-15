
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
	})

}
