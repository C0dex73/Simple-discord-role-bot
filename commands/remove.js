const { PermissionFlagsBits } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    "name" : "remove",
    "permissions" : PermissionFlagsBits.ManageRoles,
    "dm" : false,

    "run": (bot, msg, roleMessage, pairsBuffer) => {
        let emoji = msg.content.substring(1).trimStart().split(' ').filter(element => element != '')[1];
        let emojiID = (Discord.parseEmoji(emoji).id === undefined) ? "0".concat(emoji.codePointAt(0).toString(16)) : "1".concat(Discord.parseEmoji(emoji).id.toString())
        // emojiID  -->     1id  / 0unicode

        if(roleMessage.reactions.cache.get(emojiID.startsWith("1") ? emojiID.substring(1) : emoji)){
            roleMessage.reactions.cache.get(emojiID.startsWith("1") ? emojiID.substring(1) : emoji).remove();

            delete pairsBuffer[emojiID];
        }else{
            msg.reply("stop being dum, there is no such reaction");
        }

        return pairsBuffer
    }
}