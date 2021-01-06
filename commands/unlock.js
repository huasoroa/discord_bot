module.exports = {
    name : 'unlock',
    description : 'Will lock a text channel, nobody will be able to send messages unless the channel gets unlocked.',
    aliases : ['u'],
    async execute(message, args) {
        const roles = message.guild.roles.cache;
        for (const role in roles) {
            if (Object.hasOwnProperty.call(roles, role)) {
                const element = roles[role];
                console.log(element.name)
                console.log(element.permissions)
                if(!element.permissions.has('ADMINISTRATOR') && !element.permissions.has('MANAGE_MESSAGES')){
                    console.log('Went through the permissions check')
                    message.channel.overwritePermissions(element, {'SEND_MESSAGES': true})
                }
            }
        }
    }
}