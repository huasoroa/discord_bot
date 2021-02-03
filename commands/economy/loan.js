const mongoose = require('mongoose')
const UserData = require('../../models/userDataModel')

module.exports = {
    name : 'loan',
    description : 'Loan money from the bank or someone',
    aliases : ['lend','rent'],
    guildOnly : true,
    args : true,
    usage : '[amount] (@username)',
    async execute (message , args){
        if(isNaN(args[0])) return message.reply("You need to mention the amount in numbers ...")
        if(Math.sign(args[0])) return message.reply("Nice try. Life doesn't work like that tho ^^");
        if(message.mentions.users.first().id === message.author.id) return message.reply("Really ?");

        UserData.findOne({user_id: message.author.id, guild_id: message.guild.id}, (err, data) => {
            if (err) console.error(err)
            if (!data) {
                const newData = new UserData({
                    name : message.author.username,
                    user_id : message.author.id,
                    guild_id : message.guild.id,
                    money : 0,
                    daily : 0,
                })
                newData.save().catch(err => console.error(err))
                return message.reply('We have created an account for you. You have currently 0€.')
            }
            else {
                
            }
        })
    }
}