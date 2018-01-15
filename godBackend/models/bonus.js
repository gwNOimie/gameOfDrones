const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/godDatabase', { useMongoClient: true });
mongoose.Promise = global.Promise;

const BonusSchema = new mongoose.Schema({
    type : { type: String },
    damages : { type: Number },
    nbTurns : { type: Number },
    actionPointsReduction : { type: Number },
    nbTiles : { type: Number }
});

const BonusModel = mongoose.model('bonus', BonusSchema);

module.exports = {
    bonusSchema: () => BonusSchema,
    getList: () => {
        return new Promise((resolve, reject) => {
            console.log('getList');
            resolve(Gear.find({}))
        })
    },
    getFilteredList: () => {
        return new Promise((resolve, reject) => {
            console.log('getFilteredList');
            resolve(BonusModel.aggregate([
                { "$group": { "_id": "$_id", "name": { "$first": "$name" }, "gold": { "$avg": "$gold" } } },
                { "$sort": { "gold": -1 } }
            ]))
        })
    },
    getItemById: (id) => {
        console.log('getItemById : ' + id);
        return new Promise((resolve, reject) => {
            resolve(BonusModel.find({ "_id": id }))
        })
    },
    addItem: (item) => {
        return new Promise((resolve, reject) => {
            console.log('addItem');
            item.signUpDate = new Date();
            item.gold = 0;
            var gear = new BonusModel(item);

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
            BonusModel.findByIdAndUpdate(id, item, function (err, result) {
                if (err) {
                    reject(err)
                };
                resolve(result)
            })
        })
    },
    deleteItem: (id) => {
        return new Promise((resolve, reject) => {
            resolve(BonusModel.find({ "_id": id }).remove().exec())
        })
    }
}