import discord
import time
from discord.ext import commands
from discord import app_commands
from discord.ext.commands import bot
import funz as f


bot = commands.Bot(command_prefix="/", intents=discord.Intents.all(), description="")

class abot(discord.Client):

  def __init__(self):
    super().__init__(intents=discord.Intents.default())
    self.synced = False

  async def on_ready(self):
    await tree.sync(guild=discord.Object(id=1037786437606707221))
    self.synced = True
    print(f"bot{bot.user.name} startato: {time.strftime('%a %b %d %H:%M:%S %Y')}")



bot = abot()
tree = app_commands.CommandTree(bot)

@bot.event
async def on_voice_state_update(member, before, after):
    channel = bot.get_channel(1087402432079863888)
    if channel and len(channel.members) >=1:
        print("test entry")
        f.save(f.find_name(channel.members), "variables.json")
        if bot.voice_clients:
            return
        await channel.connect()
        print('Bot joined')



@tree.command(
  name="people",
  description="vedi persone in canale",
  guild=discord.Object(id=1037786437606707221))
async def self(interaction: discord.Interaction, test: str):
    channel = bot.get_channel(1087402432079863888)
    print(f.find_name(channel.members))

    ok = discord.Embed(
      title=f"test",
      description=
      f"fatto",
      colour=0xff00ff)
    await interaction.response.send_message(embed=ok)
    
    
perc = "C:\\Users\\giaco\\Desktop\\Token.json"
tok = f.read_token(perc)
bot.run(tok)
