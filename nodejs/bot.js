const { Client } = require("discord.js");
const f = require("./basicFunctions.js");
const client = new Client({
    intents:[
        "Guilds",
        "GuildMessages",
        "DirectMessages",
        "GuildVoiceStates",
        "MessageContent",
    ]
});
const { token, prefix } = require('../discord.json');

client.login(token)
client.on("ready", () => {
    console.log("online")




    client.on("voiceStateUpdate", (oldState, newState) => {
        console.log(oldState.channelId);
        if (!oldState.channelId && newState.channelId) {
            console.log("member joined");
            const connection = joinVoiceChannel  ({
                channelId: newState.channelId,
                guildId: newState.guildId,
                adapterCreator: newState.guild.voiceAdapterCreator,
            });
            connection;
        };
        console.log("boh");
    });


    client.on("messageCreate", async msg => {
        let message = msg.content;
        if (message.startsWith(prefix)){
            command = f.split_arg(message)
            switch (command[0]) {
                case "join":
                    connection = f.joins(msg);
                    f.checkAndConnect(connection);
                    break;
                case "exit":
                    console.log("exit");
                    f.exits(msg, connection);
                    break;
                    case "play":
                        connection = f.joins(msg);
                        f.checkAndConnect(connection, msg);
                        if (connection){
                            f.songInfo(command[1], msg);
                            f.playSong(command[1]);   
                        }
                        break;
                default:
                    break;
            }
        }
    });
})
