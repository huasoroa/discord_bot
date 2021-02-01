const { MessageFlags } = require('discord.js')
const mongoose = require('mongoose')
const UserData = require('../../models/userDataModel')

let claimedCache = []

const clearCache = () => {
    claimedCache = []
    setTimeout(clearCache, 1000 * 60 * 10)
}
clearCache()

module.exports = {
    name: 'daily',
    description: 'Get your daily bonus... Your daily gets reset if you miss a day so make sure to use it everyday.',
    aliases: ['dly'],
    guildOnly: true,
    async execute(message, args) {

        if (claimedCache.includes(message.author.id)) {
            return message.reply('You have already claimed your daily reward.')
        } else {
            UserData.findOne({
                user_id: message.author.id
            }, (err, data) => {
                if (err) console.log(err);
                if (!data) {
                    const newData = new UserData({
                        name: message.author.username,
                        user_id: message.author.id,
                        guild_id: message.guild.id,
                        money: 100,
                        daily: 1,
                        daily_timer: new Date(),
                    })
                    newData.save().catch(err => console.error(err))
                    message.channel.send(`<@${message.author.id}> has **100€**`)
                } else {
                    const then = new Date(data.daily_timer).getTime()
                    const now = new Date().getTime()

                    const diffTime = Math.abs(now - then)
                    const diffDays = Math.round(diffTime/ (1000*60*60*24)); 
                    if (diffDays <= 1) {
                        if(diffDays <= 2){
                            claimedCache.push(message.author.id)
                            data.daily = 1
                            data.money += data.daily * 100
                        } else {
                            claimedCache.push(message.author.id)
                            data.daily += 1
                            data.money += data.daily * 100
                        }
                        data.save().catch(err => console.error(err))
                        message.reply(`you have ${message.author} **${data.money}€**`)
                    } else{
                        message.reply('You have already claimed your daily reward.')
                    }
                }
            })
        }

    }
}