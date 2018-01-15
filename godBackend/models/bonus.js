const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/godDatabase', { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = {
  bonusSchema : new mongoose.Schema({
    type : { type: String },
    damages : { type: Number },
    nbTurns : { type: Number },
    actionPointsReduction : { type: Number },
    nbTiles : { type: Number }
  })

}