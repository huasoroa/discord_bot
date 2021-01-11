module.exports = {
    name : 'unlock',
    description : 'Will unlock a text channel, everybody will be able to send messages unless the channel gets unlocked.',
    aliases : ['u'],
    async execute(message, args) {
        console.log('Unlock function has been called')
        const roles = message.guild.roles.cache;
        console.log(`Roles => ${roles}`)
        for (const [id, value] of roles) {
            console.log(`${id} => ${value}`)
            console.log(value.name)
            if (!value.permissions.has('ADMINISTRATOR') && !value.permissions.has('MANAGE_MESSAGES')) {
                console.log('Went through the permissions check')
                message.channel.createOverwrite(value, {
                        SEND_MESSAGES: true
                    })
                    .catch(err => console.error(err))
            }
        }
        return message.reply('Channel has been unlocked')
    }
}