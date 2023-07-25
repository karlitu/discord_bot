//In bot.js
const token = "MTEzMzExNjA3MDE5MDkwNzU0Mw.GZeMFt.yyrFPM-BcghLiLE2SvdWBV1MSvdU8rfjVyy7Zo" //Token that you saved in step 5 of this tutorial
const {Client} = require("discord.js");

const client = new Client({
    intents:[
        "GUILDS",
        "GUILD_MESSAGES",
        "DIRECT_MESSAGES"
    ]
});

client.on("ready", () =>{
  console.log(client.user.username + "is online");
  client.on('messageCreate', (msg) => {
    switch (msg.content) {
      case "ping":
        msg.channel.send("pong")
        break;
      case "pong":
        msg.channel.send("pang")
        break;
      default:
        break;
    }
  });
});
client.login(token)



//  https://discordjs.guide/