module.exports = {
    name: 'ping',
    description : 'This is a ping command, used to find out the bot latency',
    guildOnly: false,
    execute(message,args){
        message.channel.send(`Latency is ${Date.now() - message.createdTimestamp}ms. `)
    }
}