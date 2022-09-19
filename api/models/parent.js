const mongoose = require('mongoose');

const parentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    role: String,
    name: String
});

module.exports = mongoose.model('Parent', parentSchema);

