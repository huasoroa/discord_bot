const mongoose = require('mongoose')

const gangDataModel = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    guild_id : {
        type : String,
        required : true,
    },
    money : Number,

})

module.exports = mongoose.model('gangData', gangDataModel, 'Discord');