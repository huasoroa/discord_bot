

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
        // Check if a Role has been mentioned
        const targetRole = message.mentions.roles.first();
        // Get the id from the Role argument 
        if(typeof(targetRole) == 'undefined') return message.reply('You need to mention the role/gang you want to add the user to.');
        // If the user isn't the Chief of the group he can't manage it.
        if (!message.author.roles.has(roleId)) return message.reply('You need to be part of the group you want to recruit for.')
        
        

        
        return message.channel.send('Command passed')
    }
}