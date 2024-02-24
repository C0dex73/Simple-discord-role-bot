const Discord = require("discord.js");
const { PermissionBitField } = require("discord.js");
const bot = new Discord.Client({intents: 3276797});
const config = require("./config.json");
const fs = require("fs");

let roleMessage = undefined;
let pairsBuffer = config.pairs //  emoji : role

console.log("starting bot...");

bot.login(config.token);

console.log("bot logged in")

bot.on("ready", () => {
    console.log("bot ready");
    bot.channels.fetch(config.channelId).then((channel) => {
        channel.messages.fetch({limit:100}).then(async (messages) => {
            messages.every((message) => {
                if(message.content === config.messageContent && message.author.id === bot.user.id) {
                    roleMessage = message;
                    return false;
                }
                return true;
            });

            if(roleMessage === undefined) {
                console.warn("The reaction role message was not found in the last 100 messages of the channel, resending it...");
                roleMessage = await channel.send(config.messageContent);
                console.log("message resended");
            }
        });
    });
});

bot.on("messageCreate", (msg) => {
    if(msg.content.startsWith(config.prefix) && !msg.author.bot) {
        let msgMember = msg.guild.members.fetch(msg.author.id);

        fs.readdirSync("./commands").forEach((file) => {
            let command = require(`./commands/${file}`);
            if(command["name"] === msg.content.substring(1).trimStart().split(" ")[0]){
                try{
                    let pairsBufferUnsafe = command["run"](bot, msg, roleMessage, pairsBuffer);
                    let toWrite = config;
                    toWrite.pairs = pairsBufferUnsafe;
                    fs.writeFile("./config.json", JSON.stringify(toWrite, undefined, 4), (err) => {
                        if(err){
                            console.error(err);
                            msg.reply("sry, an error occured. Try again and if it persists, contact the administrators for more informations");
                        }else{
                            pairsBuffer = pairsBufferUnsafe;
                        }
                    });
                }catch(err){
                    msg.reply("u dumbass didnt respected the syntax");
                    console.error(err);
                }
            }
        });
    }
});

bot.on("MessageReactionAdd", (msg, usr) => {
    //~ roleMessage.reactions.cache
})


/*
add :emoji: @role.
==> bot add emoji on msg
==> user click emoji (react) -> role given

remove :emoji:
==> bot remove react and all reacts 
*/