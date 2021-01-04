module.exports = {
    name: 'create-gang',
    description: 'Create a new gang in the guild',
    args : true,
    usage : '["your-gang-name"] [#hex-color]',
    guildOnly : true,
    async execute(message,args){
        if(args[0].startsWith('#')) return message.reply('The hexcolor should be passed as second argument')
        const argument = args.join(" ")
        const firstPart = argument.indexOf('"');
        if(firstPart !== 1) return message.reply('You need to start your gang-name with *"*')
        
    }
}