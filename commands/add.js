const { PermissionFlagsBits } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    "name" : "add",
    "permissions" : PermissionFlagsBits.ManageRoles,
    "dm" : false,

    "run": (bot, msg, roleMessage, pairsBuffer) => {
        let emoji = msg.content.substring(1).trimStart().split(' ').filter(element => element != '')[1];
        let roleID = msg.content.substring(1).trimStart().split(' ').filter(element => element != '')[2].slice(3, -1);
        let guildID = msg.guild.id;
        let emojiID = (Discord.parseEmoji(emoji).id === undefined) ? "0".concat(emoji.codePointAt(0).toString(16)) : "1".concat(Discord.parseEmoji(emoji).id.toString())
        // emojiID  -->     1id  / 0unicode

        pairsBuffer[emojiID] = `${guildID}.${roleID}`;

        roleMessage.react(emoji);

        return pairsBuffer;
    }
}