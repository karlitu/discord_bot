import json
import discord
import time
from discord.ext import commands
from discord import app_commands
from discord.ext.commands import bot
perc = "C:\\Users\\giaco\\Desktop\\Robe.json"
log_file = "log.csv"

def find_name(member_list):
    names = []
    for member in member_list:
        names.append(member.name)
    return names

    
def change_var(filename, var_name, data):
    with open(filename, 'r') as f:
        datas = json.load(f)
    datas[var_name].append(data)
    with open(filename, 'w') as f:
        json.dump(datas, f)


def add_var(filename, var_name, data):
    with open(filename, 'r') as f:
        datas = json.load(f)
    datas[var_name] = data
    with open(filename, 'w') as f:
        json.dump(datas, f)

def read_var(file, variable):
    with open(file, 'r') as f:
        dati = json.load(f)
    var = dati[variable]
    return var


def log(file, pers, dove, join):
    with open(file, 'a') as f:
        ora = time.strftime('%d %m %Y %H:%M:%S')
        if join:
            join = "join"
        elif join == False:
            join = "quit"
        else:
            join = "error"
        f.write(f"{ora};{pers};{dove};{join}\n")


def control_log(before, after, member):
    if before.channel == None:
        log(log_file, member, after.channel.name, True)
    elif after.channel == None:
        log(log_file, member, before.channel.name, False)
    else:
        log(log_file, member, before.channel.name, False)
        log(log_file, member, after.channel.name, True)


def embed(title, description):
    ok = discord.Embed(
      title=f"{title}",
      description=
      f"{description}",
      colour=0xffffff)
    ok.set_footer(
      text=f"developed by puttane",
      icon_url=
      "https://cdn.discordapp.com/attachments/1073986264983937145/1117876395369041941/letter_p.gif"
    )
    ok.set_author(
      name="puttana",
      icon_url=
      "https://cdn.discordapp.com/attachments/1073986264983937145/1117875655141498961/letter_p.png"
    )
    return ok


def get_id(tag):
    if tag.startswith("<@!") and tag.endswith(">"):
        return tag[3:-1]
    elif tag.startswith("<@&") and tag.endswith(">"):
        return tag[3:-1]
    elif tag.startswith("<#") and tag.endswith(">"):
        return tag[2:-1]
    elif tag.startswith("<@") and tag.endswith(">"):
        return tag[2:-1]
    else:
        return None
    
    
def very_present(filename, var, cosa):
    data = read_var(filename, var)
    for ele in data:
        if cosa in ele[0]:
            return True
    return False