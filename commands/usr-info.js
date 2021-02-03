const Discord = require("discord.js")
const moment = require('moment')
module.exports = {
    name : 'usr-info',
    description : 'Gives you all available information about a user on the server',
    aliases : ['info','u-i','whois'],
    usage: '(@username)',
    cooldown : 5,
    guildOnly : true,
    execute(message, args) {
        const user = message.mentions.users.first() || message.author;
        const member = message.mentions.members.first() || message.member;
        const embed = new Discord.MessageEmbed()
        .setColor('#C891A1')
        .setTitle(user.tag)
        .setDescription(`${user}`)
        .setThumbnail(user.displayAvatarURL())
        .addFields({
            name: 'Roles', value : member.roles.cache.map( r => `${r}`).join('\n'), inline:false
        })
        .addField('Joined at:', `${moment.utc(user.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`,true)
        .addField('Account created on:', `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`,true)
        .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
        .addField('Status:',user.presence.status,true)
        .setFooter(`ID: ${user.id}`)
        .setTimestamp();

        return message.channel.send(embed)
    }

}