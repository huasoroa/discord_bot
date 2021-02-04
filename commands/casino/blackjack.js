const UserData = require('../../models/userDataModel')
const _ = require('lodash')
const uniq = require('uniqid')

module.exports = {
    name: 'blackjack',
    aliases: ['bj', 'black'],
    description: 'You are playing the game of Blackjack. If you dont know the rules feel free to go to \n',
    guildOnly: true,
    async execute(message, args) {
        let playerList = [message.author]
        await message.channel.send(`A game of blackjack has been started, You have 10 seconds to join the game type \n\`-join ${gameId}\`\n or ${message.author} type\n\`-start ${gameId}\` to start the game.`)
            .then(async sentMsg => {
                while (!start && counter < 5) {
                    console.log('entered the loop')
                    await sentMsg.channel.awaitMessages(filter, {
                            max: 1,
                            time: 10000,
                            errors: ['time']
                        })
                        .then(collected => {
                            console.log(collected)
                            const joinmessage = collected.first()
                            if (joinmessage.content.includes('-start')) start = true;
                            if (playerList.length > 4)
                                playerList.push(joinmessage.author);
                            else start = true;
                            joinmessage.delete();
                        })
                        .catch(error => {
                            console.error(error)
                            message.reply(`Something went wrong during the game. \`\`\`${error}\`\`\``)
                        })
                    counter += 1;
                    console.log('==== At the end of the loop ====')
                }
                sentMsg.edit(`${gameId}\nWe have reached the maximal amount of players. ${playerList.join(', ')}`)
                await wait(3000)
                sentMsg.edit(`${gameId}\nBlackjack game has started . . .`)
                const handlerCards = getCards();
                console.log(handlerCards)
                await wait(5000)
                sentMsg.edit(`${gameId}\nThe Handler has **_Facedown_**, **_${handlerCards[1]}_**`)
                let playerValues = []
                playerList.forEach(player => {
                    let playerCards = getCards();
                    sentMsg.channel.send(`${player}, You have **_${playerCards[0]}_** and **_${playerCards[1]}_**\nDo you **_HIT_** :thumbsup: or **_STAY_** :thumbsdown: ?`)
                        .then(async answer => {
                            const reactionFilter = (reaction, user) => ['👍', '👎'].includes(reaction.emoji.name) && user.id === player.id
                            let game = false;
                            while (!game) {
                                await answer.react('👍')
                                await answer.react('👎')
                                await answer.awaitReactions(reactionFilter, {
                                        max: 1,
                                        time: 10000,
                                        errors: ['time']
                                    })
                                    .then(collected => {
                                        const reacted = collected.first()
                                        let displayString = ''
                                        if (reacted.emoji.name === '👍') {
                                            playerCards.push(getCard())
                                            answer.reactions.removeAll()
                                            playerCards.forEach(element => {
                                                displayString += `**_${element}_**, `
                                            });
                                            cardsValue = getCardsValue(playerCards)
                                            displayString += `\nValue : ${cardsValue}`
                                            if (cardsValue > 21) {
                                                game = true;
                                                answer.edit(`${player}, You have ${displayString} **_==>_** That's a bust :(`)
                                                playerValues.push({
                                                    player: player,
                                                    value: cardsValue,
                                                    cardsAmount: playerCards.length,
                                                    message: answer
                                                })
                                            } else if (cardsValue == 21) {
                                                game = true;
                                                answer.edit(`${player} You have ${displayString} **_==>_** That's a **_BLACKJACK_** PogChamp :D`)
                                                playerValues.push({
                                                    player: player,
                                                    value: cardsValue,
                                                    cardsAmount: playerCards.length,
                                                    message: answer
                                                })
                                            } else
                                                answer.edit(`${player}, You have ${displayString}\nDo you **_HIT_** :thumbsup: or **_STAY_** :thumbsdown: ?`)
                                        } else {
                                            answer.reactions.removeAll()
                                            playerCards.forEach(element => {
                                                displayString += `**_${element}_**, `
                                            })
                                            cardsValue = getCardsValue(playerCards);
                                            if (cardsValue > 21) {
                                                game = true;
                                                answer.edit(`${player}, You have ${displayString} **_==>_** That's a bust :(`)
                                                playerValues.push({
                                                    player: player,
                                                    value: cardsValue,
                                                    cardsAmount: playerCards.length,
                                                    message: answer
                                                })
                                            } else if (cardsValue == 21) {
                                                game = true;
                                                answer.edit(`${player}, You have ${displayString} **_==>_** That's a **_BLACKJACK_** PogChamp :D`)
                                                playerValues.push({
                                                    player: player,
                                                    value: cardsValue,
                                                    cardsAmount: playerCards.length,
                                                    message: answer
                                                })
                                            } else {
                                                game = true;
                                                answer.edit(`${player}, You have ${displayString} `)
                                                playerValues.push({
                                                    player: player,
                                                    value: cardsValue,
                                                    cardsAmount: playerCards.length,
                                                    message: answer
                                                })
                                            }
                                        }
                                    })
                                    .catch(error => {
                                        console.error(error)
                                        message.reply(`Something went wrong during the game. \`\`\`${error}\`\`\``)
                                    })
                            }
                            console.log('Finished first loop')
                        })
                        .catch(error => {
                            console.error(error)
                            message.reply(`Something went wrong during the game. \`\`\`${error}\`\`\``)
                        })
                });
                sentMsg.edit(`${gameId}\nThe Handler has **_${handlerCards[0]}_**, **_${handlerCards[1]}_**`)
                let handlerValue = getCardsValue(handlerCards)
                console.log(`=== Handler cards value : ${handlerValue} ===`)
                if (handlerValue >= 17) {
                    sentMsg.edit(`${gameId}\nThe Handler has **_${handlerCards[0]}_**, **_${handlerCards[1]}_** \nValue: ${handlerValue}`)
                    if (handlerValue > 21) {
                        sentMsg.edit(`${gameId}\nThe Handler has Busted ! You all win ... :/`)
                    }
                } else if (handlerValue == 21) {
                    sentMsg.edit(`${gameId}\nThe Handler has gotten a **_BLACKJACK_** ! Poggers`)
                } else {
                    sentMsg.edit(`${gameId}\nThe Handler picks another card . . .`)
                    let displayString = ''
                    handlerCards.push(getCard())
                    handlerValue = getCardsValue(handlerCards)
                    handlerCards.forEach(element => {
                        displayString += `**_${element}_**, `
                    });
                    sentMsg.edit(`${gameId}\nThe Handler has ${displayString} \nValue: ${handlerValue}`)
                    playerValues.forEach(element => {
                        if (element.value > handlerValue && element.value < 21) {
                            element.message.edit(`${element.player}, You have won !!!`)
                        } else if (element.value < handlerValue && element.value < 21) {
                            element.message.edit(`${element.player}, You have lost . . .`)
                        } else if (element.value == 21 && handlerValue == 21) {
                            if (element.cardsAmount > handlerCards.length) {
                                element.message.edit(`${element.player}, You almost had it. The handler reached the **_Blackjack_** with less cards. `)
                            } else {
                                element.message.edit(`${element.player}, You made it ! The handler made it with more cards than you.`)
                            }
                        } else {
                            element.message.edit(`${element.player}, The Handler has won, maybe next time ? ^^`)
                        }
                    });
                }
            })
            .catch(error => {
                console.error(error)
                message.reply(`Something went wrong during the game. \`\`\`${error}\`\`\``)
            })
    }

}

function getCards() {
    const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    const icons = ['♥️', '♦️', '♣️', '♠️']
    let playerCards = []
    let randomCard1 = _.random(0, 12)
    let randomCard2 = _.random(0, 12)
    let randomIcon1 = _.random(0, 3)
    let randomIcon2 = _.random(0, 3)

    if (randomCard1 == 'A' && randomCard1 === randomCard2) {
        randomCard2 = _.random(0, 12)
    }

    playerCards.push(`${cards[randomCard1]}${icons[randomIcon1]}`)
    playerCards.push(`${cards[randomCard2]}${icons[randomIcon2]}`)


    return playerCards;
}

function getCard() {
    const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    const icons = ['♥️', '♦️', '♣️', '♠️']
    let playerCard
    let randomCard1 = _.random(0, 12)
    let randomIcon1 = _.random(0, 3)
    playerCard = `${cards[randomCard1]}${icons[randomIcon1]}`
    return playerCard;
}

function getCardsValue(playerCards) {
    let cardsValue = 0
    console.log('=== Cards Value fun ===')
    playerCards.forEach(card => {
        console.log(`=== ${card} ===`)
        if (card.startsWith('J') || card.startsWith('Q') || card.startsWith('K')) {
            cardsValue += 10
        } else if (!isNaN(card[0])) {
            card_number = card.match(/(\d+)/);
            cardsValue += _.toNumber(card_number[0])
        } else if (card.startsWith('A')) {
            if (cardsValue + 11 > 21) {
                cardsValue += 1;
            } else cardsValue += 11;
        }
    });
    return cardsValue;
}

let wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function gameInit(message, args){
    const game_id = uniq();
    const join_ = `-join ${game_id}`
    const start_ = `-start ${game_id}`

    await message.channel.send(`${message.author} has started a game of blackjack. If you wish to join the game type \n\`${join_}\`\n${message.author}, if you wish to start the game type\n\`${start_}\``)
    
}

function checkForPlayer(join_msg,start_msg,message){
    const filter = m => (m.content.includes(`${join_msg}`) && !playerList.includes(m.author)) || (m.content.includes(`${start_msg}`) && m.author.id === message.author.id)
    let players = [message.author]
    let launch_game = false;
    message.channel.awaitMessages(filter, {max: 1, time:1000,error:['time']})
    .then(collected => {
        const response = collected.first();
        if (response.content.includes(join_msg)) {
            players.push(players.author)
        } else {
            return players
        }
    })
    .catch( collected => {
        checkForPlayer(join_msg,start_msg,message)
    })
}