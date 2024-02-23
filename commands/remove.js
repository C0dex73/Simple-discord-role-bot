const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    "name" : "remove",
    "permissions" : PermissionFlagsBits.ManageRoles,

    "run": (bot, msg, roleMessage, pairsBuffer) => {
        let emoji = msg.content.substring(1).trimStart().split('').filter(element => element != '')[0];
        let roleID = msg.content.substring(1).trimStart().split('').filter(element => element != '')[1].slice(3, -1);

        // TODO : remove word from buffer

        return pairsBuffer
    }
}