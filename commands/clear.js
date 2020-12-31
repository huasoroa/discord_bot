const {
    Channel
} = require("discord.js");
module.exports = {
    name: 'clear',
    description: 'Will clear all chat messages in current channel',
    async execute(message, args) {

        if (isNaN(args[0])) {
            console.log('isNan has been done')
            if (args[0] !== 'all') return message.reply('Please enter an actual number or *all*');
            let fetchSize
            do {
                console.log('Messages are being cleared')
                message.channel.messages.fetch().then( fetchedMessages => {
                    fetchSize = fetchedMessages.size
                    console.log(`We have received ${fetchSize}`)
                    message.channel.bulkDelete(fetchedMessages)
                }).catch(error => {
                    console.error(error);
                })
            } while (fetchSize >= 2);
            return message.reply('Channel has been cleared');
        }
        if (args[0] > 100) return message.reply('Please enter a number between 1 and 100');
        if (args[0] < 0) return message.reply('Please enter a number between 1 and 100');
        else {
            await message.channel.messages.fetch({
                    limit: args[0]
                })
                .then(messages => {
                    message.channel.bulkDelete(messages)
                })
                .catch(error => {
                    console.error(error)
                })
        }


    }
}