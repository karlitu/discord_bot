const { Client } = require("discord.js");
const f = require("./funz.js");
const client = new Client({
    intents:[
        "Guilds",
        "GuildMessages",
        "DirectMessages",
        "GuildVoiceStates",
        "MessageContent",
    ]
});
const { token } = require('C:\\Users\\user\\OneDrive\\Documenti\\jsbot-main\\config.json');
const {
    prefix
} = require('./data.json')

client.login(token)
client.on("ready", () => {
    console.log("online")
    client.on("messageCreate", async msg => {
        let message = msg.content;
        if (message.startsWith(prefix)){
            command = f.split_arg(message)
            console.log(command);
            switch (command[0]) {
                case "join":
                    connection = f.joins(msg);
                    connection;
                    break;
                case "exit":
                    console.log("exit");
                    f.exits(msg, connection);
                    break;
                    case "play":
                        connection = f.joins(msg);
                        try {
                            connection;
                        } catch (error) {
                            console.log("unable to connect")
                        };
                        f.songInfo(command[1], msg);
                        f.playSong(command[1]);
                        break;
                default:
                    break;
            }
        }
    });
})
