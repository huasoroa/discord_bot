const mongoose = require('mongoose');

userDataModel = mongoose.Schema({
    name : {
        type : String, 
        required : true,
    },
    user_id: {
        type: String,
        required: true,
    },
    guild_id : {
        type : String,
        required : true,
    },
    money : Number,
    daily : Number,
    items : Array,
    
})

module.exports = mongoose.model('userData', userDataModel, 'Discord')