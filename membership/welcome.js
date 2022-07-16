const { GuildManager, GuildMember } = require("discord.js")

module.exports = client => {
    
    const channelID = '995685262061482106' //welcome channel
    const targetChannelID = '995685262061482107' //rules and info
    const roleName = '997761530491850842' //Owlet

    client.on('guildMemberAdd',(member) => {

        if(!member.user.bot) //Is the member that just joined a bot? We don't want to welcome them.
        {
            const message = `Please welcome <@${member.id}> to the server! Please check out ${member.guild.channels.cache.get(targetChannelID).toString()} before getting started.`

            // Give everyone that joins the baby role
            member.roles.add(roleName)

            const channel = member.guild.channels.cache.get(channelID)
            
            channel.send(message)
        }
    })
}