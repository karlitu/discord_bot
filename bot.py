import discord
import time
from discord.ext import commands
from discord import app_commands
from discord.ext.commands import bot
import funz as f
from colorama import Fore, Back, Style

perc = "C:\\Users\\giaco\\Desktop\\Robe.json"
log_file = "log.csv"

bot = commands.Bot(command_prefix="/", intents=discord.Intents.all(), description="")

class abot(discord.Client):

  def __init__(self):
    super().__init__(intents=discord.Intents.default())
    self.synced = False

  async def on_ready(self):
    await tree.sync(guild=discord.Object(id=f.read_var(perc, "server_id")))
    self.synced = True
    print(Back.MAGENTA + Fore.BLACK + f"bot{bot.user.name} startato: {time.strftime('%a %b %d %H:%M:%S %Y')}")
    print(Style.RESET_ALL, end="")



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
        f.save(f.find_name(channel.members), "variables.json")
        if bot.voice_clients and len(channel.members)==1:
            print(Back.RED + Fore.BLACK + Style.BRIGHT + 'bot left')
            print(Style.RESET_ALL, end="")
            voice_client = bot.voice_clients[0]
            await voice_client.disconnect()
            f.save(f.find_name(channel.members), "variables.json")
            return
        if bot.voice_clients:
            return
        print(Back.GREEN + Fore.BLACK + Style.BRIGHT + 'Bot joined')
        print(Style.RESET_ALL, end="")
        await channel.connect()


tok = f.read_var(perc, "token")
bot.run(tok)