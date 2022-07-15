//Load .env file
require('dotenv').config()
// Node file system module
const fs = require('node:fs');
// Require the necessary discord.js classes
const { Client, Collection, Intents, Message } = require('discord.js');
// const { token } = require('./config.json');
const welcome = require('./membership/welcome.js');
require('dotenv').config();
const { logCommand } = require('./tools/log-command.js')
const channelID = '995685262061482106' //welcome channel
const targetChannelID = '995685262061482107' //rules and info
const raceControlID = '995691415873003621' //race-control 

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS,] });

// Create a collection of commands
client.commands = new Collection();
// Create an array of js files in the commands folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

// Loop through array of js files in commands folder
for (const file of commandFiles) {
  // save the exported value from the file
  const command = require(`./commands/${file}`);
  // set a command using the name and command object from the js file
  client.commands.set(command.data.name, command)
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log(`Logged in as ${client.user.username}`);
  welcome(client)
});

client.on('interactionCreate', async interaction => {
  // Check that the interaction is a command
  if (!interaction.isCommand())
  console.log("That isn't a command")

  if(interaction.channelId != raceControlID)
  {
    console.log(interaction.channelId)
    interaction.reply("Can't Use That Command Here")
    return;
  } else
  {
    // Get the appropriate command file from the object we created by setting each command
    const command = client.commands.get(interaction.commandName);

    // Cancel if it doesn't exist
    if(!command) {    
      console.log("Command used doesn't exist"); 
      return;
    }

    try {
      logCommand(interaction)
      // Execute the action for that command passing the interaction object as an argument
      await command.execute(interaction);
    } catch(error){
      // incase of errors
      console.error(error);
      await interaction.reply({content: 'There wa an error while executing this command!', ephemeral: true})
    }
  }
})

// Login to Discord with your client's token
client.login(process.env.TOKEN);