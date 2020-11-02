const Discord = require('discord.js');
const config = require("./config.json");
const bot = new Discord.Client();

bot.on('ready', () =>
{
    console.log('Bot has started.');
    console.log('Logged in as: ' + bot.user.username + '#' + bot.user.discriminator);
    console.log('id: ' + bot.user.id);
    console.log('-------------------------------');
});

bot.on('message', async msg =>
{
    if (msg.author.id !== bot.user.id)
        return;

    //checks if the configured prefix was used.
    if(msg.content.indexOf(config.prefix) !== 0) return;

    //setup for args
    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLocaleLowerCase();

    var old_num = 0;

    //counting function
    function count(){

        //get author of the last message
        let last_msg_author = msg.channel.lastMessage.author;

        //check if author isn't the bot.
        if(last_msg_author.id !== bot.user.id)
        {
            //get last message.
            let last_msg = msg.channel.lastMessage.content;
            console.log('Last message author: ' + last_msg_author.username + '#' + last_msg_author.discriminator);
            console.log('Last message: ' + last_msg.toString());

            //check if someone skipped the last number
            if(Number(last_msg) === old_num + 1 || old_num === 0)
            {
                //send message and store new number.
                if(!isNaN(Number(last_msg))){
                    msg.channel.send(Number(last_msg) + 1);
                    old_num = Number(last_msg) + 1;
                }
            }
        }
    }

    //loop every 5 seconds
    if (command === 'count'){
        console.log('[self-bot] started counting in: ' + msg.channel.id);
        setInterval(count, 5000);

        //delete command message after usage.
        msg.delete().catch(O_o=>{});
    }
});

bot.login(config.token);
