const Discord = require("discord.js");
const bot = new Discord.Client({intents: 3276797});
const config = require("./config.json");

let roleMessage = undefined;

console.log("STARTING BOT...");

bot.login(config.token);

console.log("BOT LOGGED IN");

bot.on("ready", () => {
    console.log("BOT READY");
    bot.channels.fetch(config.channelId).then((channel) => {
        channel.messages.fetch({limit:100}).then((messages) => {
            messages.every((message) => {
                if(message.content === config.messageContent && message.author.id === bot.user.id) {
                    roleMessage = message;
                    return false;
                }
                return true;
            });

            if(roleMessage === undefined) {
                console.warn("The reaction role message was not found in the last 100 messages of the channel, resending it...");
                channel.send(config.messageContent);
                console.log("message resended");
            }
        });
    });
});

/*bot.on("messageCreate", async (msg) => {
    
});*/