const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/godDatabase', { useMongoClient: true });
mongoose.Promise = global.Promise;

const BonusModel = require('./bonus');

module.exports = {
	attackSchema: new mongoose.Schema({
		name : { type: String },
		description : { type: String },
		damages : { type: Number },
		ammo : { type: Number },
		cooldown : { type: Number },
		accuracy : { type: Number },
		pictureId : { type: String },
		bonus : BonusModel.bonusSchema
	})

}