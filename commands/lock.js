module.exports = {
    name: 'lock',
    description: 'Will lock a text channel, nobody will be able to send messages unless the channel gets unlocked.',
    aliases: ['l'],
    async execute(message, args) {
        console.log('Lock function has been called')
        const roles = message.guild.roles.cache;
        for (const [id, value] of roles) {
            if (!value.permissions.has('ADMINISTRATOR') && !value.permissions.has('MANAGE_MESSAGES')) {
                console.log('Went through the permissions check')
                message.channel.createOverwrite(value, {
                        SEND_MESSAGES: false
                    })
                    .catch(err => console.error(err))
            }
        }
        return message.reply('Channel has been locked')
    }
}