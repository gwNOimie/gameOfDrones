//imports...
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// model
let equippedGear = new mongoose.Schema({
    propeller: {type: String}, //gear_id
    engine: {type: String}, //gear_id
    shield: {type: String}, //gear_id
    weaponLeft: {type: String}, //gear_id
    weaponRight: {type: String} //gear_id
});

let userDrone = new mongoose.Schema({

    drone: {type: String}, //drone_id
    isCurrent: {trype: Boolean},
    equippedGears: equippedGear
});

let users = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    signUpDate: {type: Date, default: Date.now},
    gold: {type: Number},
    totalGold: {type: Number},
    boughtGears: [String], //gear_id
    drones: [userDrone],
    isAdmin: {type: Boolean, required: true}
});


const User = mongoose.model('users', users);

module.exports = {
    changeGear: (user_id, body) => {
        return new Promise((resolve, reject) => {
            console.log('changeGear');
            let tempUser;
            let gear_id = body.gear_id;
            let type = body.type;
            User.find({"_id": user_id}, (err, result) => {
                if (err) {
                    reject(err)
                }
                tempUser = result;
                if (tempUser.boughtGears.indexOf(gear_id) >= 0) {

                    tempUser.drones.forEach((drone, index) => {
                        if (drone.isCurrent) {
                            let command = "drones." + index + ".equippedGears." + type;
                            User.findByIdAndUpdate({user_id}, {$set: {command: gear_id}});
                            //tempUser.drone[index].findByIdAndUpdate(user_id, {$set: {type: gear_id}});
                        }
                    })
                }
            });
        })
    }, //todo test this

    getList: () => {
        return new Promise((resolve, reject) => {
            console.log('getList');
            User.find({}, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        })
    },

    getUser: (id) => {
        return new Promise((resolve, reject) => {
            User.find({"_id": id}, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })

        })
    },

    getUserByName: (name) => {
        return new Promise((resolve, reject) => {
            User.find({"name": name}, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        })
    },

    addUser: (item) => {
        return new Promise((resolve, reject) => {
            console.log('addUser');
            item.signUpDate = new Date();
            item.gold = 0;
            const user = new User(item);
            User.find({"email": user.email}, (err, result) => { //check unique mail
                console.log(result);
                if (err) {
                    reject(err);
                }
                if (result.length >= 1) {
                    reject("duplicate email")
                } else {
                    User.find({"name": user.name}, (err, result) => { //check unique name
                        if (err) {
                            reject(err);
                        }
                        if (result.length >= 1) {
                            reject("duplicate name")
                        } else {
                            user.save(item, (err, result) => {
                                if (err) {
                                    reject(err)
                                }
                                resolve(result)
                            })
                        }
                    });

                }
            });
        })
    },

    updateUser: (id, item) => {
        return new Promise((resolve, reject) => {
            User.findByIdAndUpdate(id, item, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result);
                console.log(result)
            })
        })
    },

    deleteUser: (id) => {
        return new Promise((resolve, reject) => {
            User.findByIdAndRemove(id, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result)
            })
        })
    }
};


