const { GuildManager, GuildMember } = require("discord.js")

module.exports = client => {
    
    const ruleMessageID = '997774503994200074' //welcome channel
    const botLogsChannelID = '997782628101009408' //Bot Logs
    const OwletRoleID = '997761530491850842' //Owlet
    const barnOwlRoleID = '997766497835425853' //Barn Own

    client.on('messageReactionAdd', async (reaction, user) => {
      // When a reaction is received, check if the structure is partial
      if (reaction.partial) {
        // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
        try {
          await reaction.fetch();
        } catch (error) {
          console.error('Something went wrong when fetching the message:', error);
          // Return as `reaction.message.author` may be undefined/null
          return;
        }
      }

      console.log(reaction.message.id)

      if(reaction.message.id == ruleMessageID)
      {
        if (reaction.emoji.name === '👍')
        {

            console.log(reaction.message)

            const roleToAdd = reaction.message.guild.roles.cache.find(r => r.id === barnOwlRoleID); //finds role you want to assign (you could also user .name instead of .id)
            const roleToRemove = reaction.message.guild.roles.cache.find(r => r.id === OwletRoleID); //finds role you want to assign (you could also user .name instead of .id)

            const { guild } = reaction.message //store the guild of the reaction in variable

            const member = guild.members.cache.find(member => member.id === user.id); //find the member who reacted (because user and member are seperate things)

            const channel = member.guild.channels.cache.get(botLogsChannelID)

            member.roles.add(roleToAdd); //assign selected role to member now that they have agreed to the rules

            channel.send(`${reaction.message.author.username}' was given the "${reaction.message.content}" Barn Owl role`);

            member.roles.remove(roleToRemove); //remove role from member now that they have agreed to the rules

            channel.send(`${reaction.message.author.username}' was removed from the "${reaction.message.content}" Owlet role`);
        }
    } else
    {
      console.log("Reaction can't go here");
    }
    });
}