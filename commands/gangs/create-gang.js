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
        if(firstPart !== 0) return message.reply('You need to start/end your gang-name with *"*')
        const lastPart = argument.lastIndexOf('"')
        const gangName = argument.substring(firstPart+1,lastPart)
        const startHex = argument.indexOf('#')
        const hexColor = argument.substring(startHex)
        console.log(hexColor)
        console.log(gangName)
        
        
    }
}