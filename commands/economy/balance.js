const mongoose = require('mongoose')
const UserData = require('../../models/userDataModel')

module.exports = {
    name : 'balance',
    description : 'Check your balance from the casino',
    aliases : ['bal'],
    guildOnly: true,
    async execute(message,args) {
        UserData.findOne({user_id: message.author.id}, (err, data) => {
            if(err) console.log(err);
            if(!data) {
                const newData = new UserData({
                    name : message.author.username,
                    user_id : message.author.id,
                    guild_id : message.guild.id,
                    money : 0,
                    daily : 0, 
                })
                newData.save().catch(err => console.error(err))
                return message.channel.send(`<@${message.author.id}> has **0€**`)
            } else {
                return message.channel.send(`<@${message.author.id}> has **${data.money}€**`)
            }
        })
        
    }
}