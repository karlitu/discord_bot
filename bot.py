import discord
import time
from discord.ext import commands
from discord import app_commands
from discord.ext.commands import bot
import funz as f


perc = "C:\\Users\\giaco\\Desktop\\Token.json"
log_file = "log.csv"

bot = commands.Bot(command_prefix="/", intents=discord.Intents.all(), description="")

class abot(discord.Client):

  def __init__(self):
    super().__init__(intents=discord.Intents.default())
    self.synced = False

  async def on_ready(self):
    await tree.sync(guild=discord.Object(id=f.read_var(perc, "server_id")))
    self.synced = True
    print(f"bot{bot.user.name} startato: {time.strftime('%a %b %d %H:%M:%S %Y')}")



bot = abot()
tree = app_commands.CommandTree(bot)


@bot.event
async def on_voice_state_update(member, before, after):
    if before.channel == None:
        f.log(log_file, member, after.channel.name, True)
    elif after.channel == None:
        f.log(log_file, member, before.channel.name, False)
    else:
        f.log(log_file, member, before.channel.name, False)
        f.log(log_file, member, after.channel.name, True)
        
    channel = bot.get_channel(f.read_var(perc, "channel_id"))
    if channel and len(channel.members) >=1:
        print("test entry")
        f.save(f.find_name(channel.members), "variables.json")
        if bot.voice_clients and len(channel.members)==1:
            print('bot left')
            voice_client = bot.voice_clients[0]
            await voice_client.disconnect()
            f.save(f.find_name(channel.members), "variables.json")
            return
        if bot.voice_clients:
            return
        await channel.connect()
        print('Bot joined')



@tree.command(name="people", description="vedi persone in canale", guild=discord.Object(id=f.read_var(perc, "server_id")))
async def self(interaction: discord.Interaction):
    channel = bot.get_channel(f.read_var(perc, "channel_id"))
    f.save(f.find_name(channel.members), "variables.json")
    print(f.find_name(channel.members))

    ok = discord.Embed(
      title=f"test",
      description=
      f"fatto",
      colour=0xff00ff)
    await interaction.response.send_message(embed=ok)


tok = f.read_var(perc, "token")
bot.run(tok)