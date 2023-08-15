const { 
    Client,
    NewsChannel, 
    GuildMember, 
    Collection, 
    VoiceChannel, 
    ChannelType,
    Events,
    GatewayIntentBits
 } = require("discord.js");
const f = require("./basicFunctions.js");
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
    intents:[
        "Guilds",
        "GuildMessages",
        "GuildVoiceStates",
        "GuildMembers",
        "GuildPresences",
        "DirectMessages",
        "MessageContent",
        "GuildIntegrations"
    ]
});
const { token } = require('C:\\Users\\user\\OneDrive\\Documenti\\jsbot-main\\config.json');
const { 
    prefix,
    clientId,
} = require("./data.json");
let connection = null;

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    }
}

client.login(token)
client.on("ready", () => {
    console.log("online");
});

client.on('guildCreate', (guild) => {
    let myChannel = guild.channels.cache.find((channel) => channel.name.toLowerCase() === `puttane`);
    if (myChannel!==undefined) {
        myChannel.send("It appears that I've been here before");
        return;
    }
    found = false;
    guild.channels.cache.forEach(channel => {
        if (found) return channel;
        if (channel.type === 0) {
            greetingsChannel = channel;
            found = true;
        }
    });
    greetingsChannel.send("§eheh");
});


client.on("messageCreate", async msg => {
    let chann = client.channels.cache.get(msg.channelId);
    if (msg.content.startsWith(prefix)){
        command = f.split_arg(msg.content)
        switch (command[0]) {
            case "join":
                connection = f.joins(msg, chann);
                f.checkAndConnect(connection, chann);
                break;
            case "exit":
                f.exits(msg, connection, chann);
                break;
            case "play":
                if (client.voice.adapters.size==0){
                    connection = f.joins(msg, chann);
                    f.checkAndConnect(connection, chann);
                }
                f.playSong(command.slice(1).join(" "), connection, chann);   
                break;
            case "eheh":
                f.createMyChannel(msg);
                break;
            default:
                chann.send("enter a valid command. here's a list:\njoin\nexit\nplay");
                break;
        }
    }
});


client.on("voiceStateUpdate", async (oldState, newState) => {
    let newChannelID = newState.channelId; let oldChannelID = oldState.channelId;
    let oldPeople = newPeople = 0;
    let botChannel = null;
    if (oldChannelID) oldPeople = client.channels.cache.get(oldChannelID).members.size;
    if (newChannelID) newPeople = client.channels.cache.get(newChannelID).members.size; 
    try { botChannel = newState.guild.members.me.voice } catch (error) { return};
    let chann = newState.guild.channels.cache.find((channel) => channel.name.toLowerCase() === `puttane`);
    if (newChannelID!=oldChannelID) {
        if (newChannelID) {
            if (client.voice.adapters.size==1 && oldPeople<=1) {
                if (botChannel.channelId==oldChannelID && botChannel.channelId!=newChannelID) {
                    connection = f.joins(newState, chann);
                    f.checkAndConnect(connection, chann);
                }
            } else {
                if (oldPeople>1) return;
                connection = f.joins(newState, chann);
                f.checkAndConnect(connection, chann);
            }
        } else {
            if (newPeople<=1 && client.voice.adapters.size==1 && botChannel.channelId==oldChannelID) {
                f.exits(botChannel, connection, chann);
            }
        }
        //usa oldChannelId e newChannelId per aggiornare la lista da zero ogni volta
        let list = [];
        newState.guild.members.cache.forEach(member => {
            if (member.user.id!=clientId) {
                if (member.voice.channelId==botChannel.channelId) {
                    let people = client.channels.cache.get(newChannelID).members
                    people.forEach(user => {if (user.id!=clientId) list.push(user.id)});
                } else {
                    client.channels.cache.get(newChannelID).members.forEach(user => {
                        let person = user.id;
                        if (person in list) {
                            pos = f.checkPlace(person, list);
                            list.splice(pos,pos);
                        } else {return;}
                    })
                }
                console.log(list);
            }
        });
    }
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.log("noh");
        return;
    };
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
    };
});
    
// C:\Users\user\OneDrive\Documenti\noh\node_modules\discord.js\src\util\Constants.js:214
// ho commentato sta cosa per risolvere un problema