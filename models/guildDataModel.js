const mongoose = require('mongoose');

guildDataModel = mongoose.Schema({
    name: {
        type : String,
        required : true,
    },
    guild_id : {
        type: String,
        required: true,
    },
    logging : Boolean,
    log_channel : String,
    announcements: {
        name : {
            type : String,
            required: true,
        },
        channel_id : {
            type : String,
            required : true,
        }
    }
})

module.exports = mongoose.model('guildData', guildDataModel, 'Discord');