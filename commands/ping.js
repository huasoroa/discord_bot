module.exports = {
    name: 'ping',
    description : 'This is a ping command, Useful for testing',
    guildOnly: false,
    execute(message,args){
        message.channel.send('Va tester autre part chien de la casse')
    }
}