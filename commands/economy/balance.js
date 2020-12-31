const mongoose = require('mongoose')
const { execute } = require('../clear')
const UserDataModel = require('./models/userDataModel')

mongoose.connect('mongodb+srv://admin:0ePdvSQ4r7GXOA6TogMp@cluster0.rsgmx.mongodb.net/discord?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology : true,
})

module.exports = {
    name : 'balance',
    description : 'Check your balance from the casino',
    aliases : ['bal'],
    guildOnly: true,
    async execute(message,args) {
        message.author.id
    }
}