//imports...
var mongoose = require('mongoose');

var gear = new mongoose.Schema({
	cost: { type: int },
	level: { type: int },
	source: { type: String },
	name: { type: String },
	description: { type: String }
});

// Methods
var getList = () => {

}