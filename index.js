require('dotenv').config()
const fs = require('fs')
const path = require('path')

// Packages needed for this to work
const Discord = require('discord.js')
const mongoose = require('mongoose')
const Twitter = require('twit')

// Instantiating Discord Client/Bot
const client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION', 'CHANNEL', 'USER']
});

// Preparing Twitter configuration needed for twit
const twitConf = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret : process.env.TWITTER_CONSUMER_SECRET,
    access_token : process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret : process.env.TWITTER_ACCESS_TOKEN_SECRET,
}

// Channel to provide logs
const logsChannel_id = process.env.DISCORD_LOG_CHANNEL_ID

// Prefix for your commands
const prefix = process.env.DISCORD_PREFIX || '-';

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

// Used to provide cooldowns on your commands
const cooldowns = new Discord.Collection();

function registerCommands(dir = 'commands') {
    //Read the directory/file.
    const files = fs.readdirSync(path.join(__dirname, dir))
    // Loop through each file.
    for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file))
        if(stat.isDirectory()) //If file is a directory
            registerCommands(path.join(dir,file))
            else {
                // Check if file is a .js file
                if (file.endsWith(".js")) {
                    try {
                        const cmdName = file.substring(0, file.indexOf('.js'))
                        const cmdModule = require(path.join(__dirname, dir, file))
                        client.commands.set(cmdName, cmdModule)
                        console.log(`Registering Command "${cmdName}".`)
                    } catch (error) {
                        console.error(error)
                    }
                }
            }
    }
}

client.on('ready', () => {
    // // Instantiate the Twitter API 
    // const twit = new Twitter(twitConf)

    // // Create a stream to follow on twitter
    // const stream = twit.stream('statuses/filter',{
    //     follow : '', // Follow the twitter account ID
    // })
    // // ID of the streaming channel
    // const destinationChannel = ''

    // stream.on('tweet', tweet => {
    //     const twitterMessage = `${tweet.user.name} (@${tweet.user.screen_name}) tweeted this: https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
    //     client.channels.get(dest).send(twitterMessage);
    //     return false;
    //   });
    // Make the connection to MongoDB 
    mongoose.connect('mongodb+srv://admin:0ePdvSQ4r7GXOA6TogMp@cluster0.rsgmx.mongodb.net/discord?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology : true,
}).catch(err => {console.error(err)})
console.log('Connected to database.')
    // Finds all the commands inside the command folder
    registerCommands()
    console.log(`"${client.user.tag}" has loaded correctly.`)
})

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.channel.reply('You can not do this!');
		}
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

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
        let logsChannel = client.channels.cache.get(logsChannel_id)
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
        let logsChannel = client.channels.cache.get(logsChannel_id)
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
        let logsChannel = client.channels.cache.get(logsChannel_id)
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
                console.log(`The ${reaction.emoji} is not part of the selected roles.`)
                break;
        }
    }else if (reaction.message.id === '793510333515563038') {
        if (!member.roles.cache.has('783744168903180338'))
            member.roles.add('783744168903180338')
        let logsChannel = client.channels.cache.get(logsChannel_id)
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
                console.log(`The ${reaction.emoji.name} is not part of the selected roles`)
                break;
        }
    }
})
client.login(process.env.DISCORD_TOKEN)
