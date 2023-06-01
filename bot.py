import discord
import time
from discord.ext import commands
from discord import app_commands
from discord.ext.commands import bot


bot = commands.Bot(command_prefix="/",
                   intents=discord.Intents.all(),
                   description="")

class abot(discord.Client):

  def __init__(self):
    super().__init__(intents=discord.Intents.default())
    self.synced = False

  async def on_ready(self):
    await tree.sync(guild=discord.Object(id=1037786437606707221))
    self.synced = True
    print(
      f"bot{bot.user.name} startato: {time.strftime('%a %b %d %H:%M:%S %Y')}")




bot = abot()
tree = app_commands.CommandTree(bot)


tok = "MTA0MjA5NzgxODQ2NDE2NTk1OA.GDk6ZM.OoRYTpX7-Mn4F8XBEfcVsShBspfOtzPdxxPi4A"
bot.run(tok)