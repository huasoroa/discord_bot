const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION', 'CHANNEL', 'USER']
});

let prefix = '-';

// Role Id's
const belgian = '785170330725122098'
const morrocan = '785170503832436749'
const french = '785170505132408854'
const japanese = '785170506538025010'
const american = '785170617669779476'
const greek = '785175196977987634'
const italian = '785175198194204672'
const hetero = '785170320931029045'
const homo = '785170329299058748'
const nonBinary = '785170330234650664'
const huasoroaClub = '785175194678329354'
const bijoClub = '785175195975417857'

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}

client.on('ready', () => {
    console.log('Client is ready ! <3')
})

client.on('message', msg => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase()

    if (command === 'niquetoi') {
        console.log('Understood nique ta mere')
        msg.reply('Toi meme petit enculé')
    } else if (command === 'ping')
        client.commands.get('ping').execute(msg, args)
    else if (command === 'clear') {
        client.commands.get('clear').execute(msg,args);
        
    }
})

client.on('guildMemberAdd', (Member) => {
    console.log('New member has been added to the server')
    const mainRoles = ['748498206442127380', '783744913534615612', '748502044842786876', '783744116198342686', '783744168903180338', '785175072339394610']
    for (const zebi of mainRoles) {
        member.roles.add(zebi)
    }
})

client.on('messageReactionRemove', (reaction, user) => {
    console.log('Reaction remove triggered')
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '793508642162081822') {
        if (!member.roles.cache.has('783744116198342686')) {
            member.roles.add('783744116198342686');
        }
        let logsChannel = reaction.message.guild.channels.cache.get('783744838293913610')
        switch (reaction.emoji.name) {
            case '🧇':
                member.roles.remove(belgian)
                logsChannel.send(`<@${user.id}> has been removed from the <@&${belgian}>`)
                break;
            case '⚗️':
                member.roles.remove(morrocan)
                logsChannel.send(`<@${user.id}> has been removed from the <@&${morrocan}>`)
                break;
            case '🥖':
                member.roles.remove(french)
                logsChannel.send(`<@${user.id}> has been removed from the <@&${french}>`)
                break;
            case '㊙️':
                member.roles.remove(japanese)
                logsChannel.send(`<@${user.id}> has been removed from the <@&${japanese}>`)
                break;
            case '🗽':
                member.roles.remove(american)
                logsChannel.send(`<@${user.id}> has been removed from the <@&${american}>`)
                break;
            case '🎭':
                member.roles.remove(greek)
                logsChannel.send(`<@${user.id}> has been removed from the <@&${greek}>`)
                break;
            case '🍝':
                member.roles.remove(italian)
                logsChannel.send(`<@${user.id}> has been removed from the <@&${italian}>`)
                break;
            default:
                console.log('WLH jai pas compris')
                break;
        }
    } else if (reaction.message.id === '793510333515563038') {
        if (!member.roles.cache.has('783744168903180338'))
            member.roles.add('783744168903180338')
        let logsChannel = reaction.message.guild.channels.cache.get('783744838293913610')
        switch (reaction.emoji.name) {
            case '🔴':
                member.roles.remove(hetero)
                logsChannel.send(`<@${user.id}> has been removed from the <@&${hetero}>`)
                break;
            case '🏳️‍🌈':
                member.roles.remove(homo)
                logsChannel.send(`<@${user.id}> has been removed from the <@&${homo}>`)
                break;
            case '🔵':
                member.roles.remove(nonBinary)
                logsChannel.send(`<@${user.id}> has been removed from the <@&${nonBinary}>`)
                break;
            default:
                console.log('Not part of the roles')
                break;
        }
    }
})

client.on('messageReactionAdd', (reaction, user) => {
    console.log('Reaction event triggered.')
    const member = reaction.message.guild.members.cache.get(user.id)

    if (reaction.message.id === '793508642162081822') {
        if (!member.roles.cache.has('783744116198342686')) {
            member.roles.add('783744116198342686');
        }
        let logsChannel = reaction.message.guild.channels.cache.get('783744838293913610')
        switch (reaction.emoji.name) {
            case '🧇':
                member.roles.add(belgian)
                logsChannel.send(`<@${user.id}> has been added to the <@&${belgian}>`)
                break;
            case '⚗️':
                member.roles.add(morrocan)
                logsChannel.send(`<@${user.id}> has been added to the <@&${morrocan}>`)
                break;
            case '🥖':
                member.roles.add(french)
                logsChannel.send(`<@${user.id}> has been added to the <@&${french}>`)
                break;
            case '㊙️':
                member.roles.add(japanese)
                logsChannel.send(`<@${user.id}> has been added to the <@&${japanese}>`)
                break;
            case '🗽':
                member.roles.add(american)
                logsChannel.send(`<@${user.id}> has been added to the <@&${american}>`)
                break;
            case '🎭':
                member.roles.add(greek)
                logsChannel.send(`<@${user.id}> has been added to the <@&${greek}>`)
                break;
            case '🍝':
                member.roles.add(italian)
                logsChannel.send(`<@${user.id}> has been added to the <@&${italian}>`)
                break;
            default:
                console.log('WLH jai pas compris')
                break;
        }
    }else if (reaction.message.id === '793510333515563038') {
        if (!member.roles.cache.has('783744168903180338'))
            member.roles.add('783744168903180338')
        let logsChannel = reaction.message.guild.channels.cache.get('783744838293913610')
        switch (reaction.emoji.name) {
            case '🔴':
                member.roles.add(hetero)
                logsChannel.send(`<@${user.id}> has been added to the <@&${hetero}>`)
                break;
            case '🏳️‍🌈':
                member.roles.add(homo)
                logsChannel.send(`<@${user.id}> has been added to the <@&${homo}>`)
                break;
            case '🔵':
                member.roles.add(nonBinary)
                logsChannel.send(`<@${user.id}> has been added to the <@&${nonBinary}>`)
                break;
            default:
                console.log('Not part of the roles')
                break;
        }
    }
})
client.login('NzkzNDYwOTI3NzM4ODA2MzIy.X-smEg.i1IZrIVngp3ovvdTJBr6wGZKltM')