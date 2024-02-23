const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    "name" : "add",
    "permissions" : PermissionFlagsBits.ManageRoles,

    "run": (bot, msg, roleMessage, pairsBuffer) => {
        let emoji = msg.content.substring(1).trimStart().split('').filter(element => element != '')[0];
        let roleID = msg.content.substring(1).trimStart().split('').filter(element => element != '')[1].slice(3, -1);

        // TODO : add pair to buffer

        // TODO : add react to msg (with words[1])

        return pairsBuffer
    }
}