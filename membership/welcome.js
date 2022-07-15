module.exports = client => {
    
    const channelID = '995685262061482106' //welcome channel
    const targetChannelID = '995685262061482107' //rules and info
    
    client.on('guildMemberAdd',(member) => {

        const message = `Please welcome <@${member.id}> to the server! Please check out ${member.guild.channels.cache.get(targetChannelID).toString()} before getting started.`

        const channel = member.guild.channels.cache.get(channelID)
        
        channel.send(message)

    })
}