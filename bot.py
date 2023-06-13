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
    await tree.sync(guild=discord.Object(id=f.read_var(f.perc, "server_id")))
    self.synced = True
    print(f"bot{bot.user.name} startato: {time.strftime('%a %b %d %H:%M:%S %Y')}")



bot = abot()
tree = app_commands.CommandTree(bot)


@bot.event
async def on_voice_state_update(member, before, after):
    f.control_log(before, after, member)
        
    channel = bot.get_channel(f.read_var(f.perc, "channel_id"))
    if channel and len(channel.members) >=1:
        if bot.voice_clients and len(channel.members)==1:
            print('bot left')
            voice_client = bot.voice_clients[0]
            await voice_client.disconnect()
            return
        if bot.voice_clients:
            return
        print('Bot joined')
        await channel.connect()


@tree.command(name="people", description="vedi persone in canale", guild=discord.Object(id=f.read_var(f.perc, "server_id")))
async def self(interaction: discord.Interaction):
    channel = bot.get_channel(f.read_var(f.perc, "channel_id"))
    people = f.find_name(channel.members)
    emb = f.embed("list people", f"now there are {len(people)} people")
    for i in range(0, len(people)):
        emb.add_field(name="number", value=i+1, inline=True)
        emb.add_field(name="name", value=people[i], inline=True)
        emb.add_field(name="" ,value="", inline=True)
    await interaction.response.send_message(embed=emb)


@tree.command(name="show", description="show somebody's song list", guild=discord.Object(id=f.read_var(f.perc, "server_id")))
async def self(interaction: discord.Interaction, user: str):
    user_id = f.get_id(user)
    if user_id not in f.read_var("song.json", "user"):
        emb = f.embed("list error", f"{user}'s list doesn't exist")
        await interaction.response.send_message(embed=emb)
    else:
        song = f.read_var("song.json", user_id)
        emb = f.embed("list song", f"{user}'s song list")
        for i in range(0, len(song)):
            emb.add_field(name="number", value=i+1, inline=True)
            emb.add_field(name="song", value=song[i][0], inline=True)
            emb.add_field(name="author" ,value=song[i][1], inline=True)
        await interaction.response.send_message(embed=emb)


@tree.command(name="add", description="add song in your list", guild=discord.Object(id=f.read_var(f.perc, "server_id")))
async def self(interaction: discord.Interaction, title: str, author: str):
    user_id = str(interaction.user.id)
    if user_id not in f.read_var("song.json", "user"):
        emb = f.embed("list error", f"<@{user_id}>'s list doesn't exist")
        await interaction.response.send_message(embed=emb)
    else:
        if f.very_present("song.json", user_id, title):   
            emb = f.embed("song error", f"{title} is already in")
            await interaction.response.send_message(embed=emb)
        else:
            f.change_var("song.json", user_id, [title, author])
            list = f.read_var("song.json", user_id)
            emb = f.embed("song confirm", f"added in yout list {list[len(list)-1][0]} by {list[len(list)-1][1]}")
            await interaction.response.send_message(embed=emb)


@tree.command(name="list", description="add list for your songs", guild=discord.Object(id=f.read_var(f.perc, "server_id")))
async def self(interaction: discord.Interaction):
    user_id = str(interaction.user.id)
    if user_id  in f.read_var("song.json", "user"):
        emb = f.embed("list error", f"<@{user_id}>'s list already exist")
        await interaction.response.send_message(embed=emb)
    else:
        f.change_var("song.json", "user", user_id)
        f. add_var("song.json", user_id, [])
        emb = f.embed("list confirm", f"<@{user_id}'s list create")
        await interaction.response.send_message(embed=emb)
            
tok = f.read_var(f.perc, "token")
bot.run(tok)