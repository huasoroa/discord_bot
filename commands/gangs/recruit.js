

module.exports = {
    name : 'recruit',
    description : 'Allow you to recruit somebody into your gang',
    aliases : ['rec'],
    guildOnly: true,
    args : true,
    usage : '[@username] [@clan-role]',
    async execute(message, args) {
        if (typeof(args[0]) == 'undefined') return message.reply('You need to mention an actual user.')
        if (typeof(args[1]) == 'undefined') return message.reply('You need to mention the role/gang you want add the user to.') 
        const targetUser = message.mentions.users.first();
        if(typeof(targetUser) == 'undefined') return message.reply('You must specify a user as first argument *@username*')
        // Retrieve the first mentioned role
        const targetRole = message.mentions.roles.first();
        // Check if the role has a value if it doesn't it means that a role hasn't been identified. 
        if(typeof(targetRole) == 'undefined') return message.reply('You need to mention the role/gang you want to add the user to.');
        // If the user isn't the Chief of the group he can't manage it.
        if (!message.author.roles.has(roleId)) return message.reply('You need to be part of the group you want to recruit for.')
        message.channel.send(`${targetUser}, Do you wish to join ${targetRole}? YES - :thumbsup: NO - :thumbsdown:`)
        .then(ask => {
            await ask.react('👍')
            await ask.react('👎')
            const filter = (reaction, user) => ['👍','👎'].includes(reaction.emoji.name) && user.id === targetUser.id
            await ask.awaitReactions(filter, {max: 1, time: 10000, error: ['time']})
                .then( collected => {
                    const reacted = collected.first();
                    if (reacted.emoji.name === '👍') {
                        user.roles.add(targetRole)
                        return message.reply(`${targetUser} has been added to your gang.`)
                    }
                    else {
                        return message.reply(`${targetUser} refused to enter your gang.`)
                    }
                })
        })
        

        
        return message.channel.send('Command passed')
    }
}