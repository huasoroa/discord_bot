const UserData = require('../../models/userDataModel')

module.exports = {
    name: 'transfer',
    description: 'Transfer money from one account to the other',
    args: true,
    usage: '[amount] [@target-username]',
    cooldown: 5,
    guildOnly: true,
    execute(message, args) {
        if (isNaN(args[0])) return message.reply("You need to add an amount")
        if (!message.mentions.users.first()) return message.reply("You need to mention who you are giving the money to.")
        if (message.mentions.users.first().id === message.author.id) return message.reply("Nice try :)")
        if (Math.sign(args[0]) === -1) return message.reply("You wish you could huh ?")
        // Check if the sender has an account
        UserData.findOne({
            user_id: message.author.id,
            guild_id: message.guild.id,
        }).then((err, data) => {
            // Log if something went wrong while retrieving the data
            if (err) {
                console.error(err);
            }
            // If the sender doesn't have an account make one. 
            if (!data) {
                const newData = new UserData({
                    name: message.author.username,
                    user_id: message.author.id,
                    guild_id: message.guild.id,
                    money: 0,
                })
                newData.save().catch(err => console.error(err))
                return message.reply(`You don't have an account yet, Therefore we have made you one.`)
            } else {
                const targetUser = message.mentions.first();
                data.money -= args[0]
                // Find the targeted user in the database.
                UserData.findOne({
                    user_id: message.mentions.users.first().id,
                    guild_id: message.guild.id,
                }).then((err, targetData) => {
                    if (err) {
                        console.error(err)
                    }
                    // Check if the user exists.
                    if (!targetData) {
                        const newData = new UserData({
                            name: targetUser.username,
                            user_id: targetUser.id,
                            guild_id: message.guild.id,
                            money: args[0],
                        })
                        newData.save().catch(err => console.error(err))
                        return message.reply(`You have transferred ${args[0]}€ to <@${targetUser.id}>.`)
                    } else {
                        targetData.money += args[0]
                        return message.reply(`You have transferred ${args[0]}€ to <@${targetUser.id}>.`)
                    }
                })
            }
        })
    }
}