//imports...
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/godDatabase', { useMongoClient: true });
mongoose.Promise = global.Promise;

//test
const fs = require('fs');
const path = require('path');

// model
let equippedGear = new mongoose.Schema({
	propeller: { type: String }, //gear_id
	engine: { type: String }, //gear_id
	shield: { type: String }, //gear_id
	weaponLeft: { type: String }, //gear_id
	weaponRight: { type: String } //gear_id
});

let userDrone = new mongoose.Schema({

	drone: { type: String }, //drone_id
	isCurrent: { type: Boolean },
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
	drones: [userDrone]
});


var User = mongoose.model('users', users);

module.exports = {
	changeGear: (user_id, body) => {
		return new Promise((resolve, reject) => {
			console.log('changeGear');
			let tempUser;
			let gear_id = body.gear_id;
            let type = body.type;
			User.findById(user_id, (err, result) => {
				if (err) {
					reject(err)
				}
				tempUser = result;
                if (tempUser.boughtGears.indexOf(gear_id) >= 0) {

					tempUser.drones.forEach((drone, index) => {
						if (drone.isCurrent){
							console.log("TEST : " )

							let command = "drones."+index+".equippedGears."+type;
							User.findByIdAndUpdate(user_id, {$set :{"drones.'index'.equippedGear.engine": gear_id}}).then(resolve(result));
							//tempUser.drone[index].findByIdAndUpdate(user_id, {$set: {type: gear_id}});
						}
					})
                }
			});
		})
	},
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
			console.log('addItem : ' + item.drones[1].isCurrent);
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
	},
	//Test
	getSong: () => {
        return function(req, res) {
            const path = 'assert/Alarm10.wav'
            const stat = fs.statSync(path)
            const fileSize = stat.size
            const range = req.headers.range

            if (range) {
                const parts = range.replace(/bytes=/, "").split("-")
                const start = parseInt(parts[0], 10)
                const end = parts[1]
                    ? parseInt(parts[1], 10)
                    : fileSize-1
                const chunksize = (end-start)+1
                const file = fs.createReadStream(path, {start, end})
                const head = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize,
                    'Content-Type': 'audio/x-wav',
                }

                res.writeHead(206, head);
                file.pipe(res);
            } else {
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': 'audio/x-wav',
                }
                res.writeHead(200, head)
                fs.createReadStream(path).pipe(res)
            }
        }
	}
}


