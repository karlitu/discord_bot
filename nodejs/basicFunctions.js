"use strict";
const {EmbedBuilder, ChannelType, Client} = require("discord.js");
const play = require('play-dl');
// const ytdl = require('ytdl-core');
const { video_basic_info, stream } = require('play-dl');
const yts = require("yt-search");
const { createAudioPlayer, joinVoiceChannel, createAudioResource } = require('@discordjs/voice');
const { error } = require("console");
const { send } = require("process");
const { 
    prefix,
    clientId,
} = require("./data.json");
let ok = null;
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

function create_embed(color, title, description) {
    const emb = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setDescription(description)
    .setAuthor(
        {
            name: "puttane",
            iconURL: "https://cdn.discordapp.com/attachments/1073986264983937145/1117875655141498961/letter_p.png",
        }
    )
    .setFooter(
        {
            text: "developoed by puttane",
            iconURL: "https://cdn.discordapp.com/attachments/1073986264983937145/1117876395369041941/letter_p.gif"
        }
    )
  return emb;
}

function song_embed(color, title, rawRequest) {
    const emb = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setURL(rawRequest)
    .setThumbnail('https://cdn.discordapp.com/attachments/1138597014578397316/1138951938449350869/2Q.png')
    .setAuthor(
        {
            name: "puttane - now playing a song",
            iconURL: "https://cdn.discordapp.com/attachments/1073986264983937145/1117875655141498961/letter_p.png",
            description: "now playing a song"
        }
    )
    .setFooter(
        {
            text: "developoed by puttane",
            iconURL: "https://cdn.discordapp.com/attachments/1073986264983937145/1117876395369041941/letter_p.gif"
        }
    )
  return emb;
}

function joins(message, textChann) {
    const channel = message.member.voice.channel;
    if (!channel) {
        textChann.send("not in a vc");
    } else {
        const connection = joinVoiceChannel  ({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
        return connection;
    }
    return;
}

function exits(message, connection, textChann) {
    if (message) {
        const channel = message.member.voice.channel;
        if (!channel) {
            textChann.send("not in a vc");
            return;
        }
    }
    try {connection.destroy();} catch (error) {console.log(error);};
    ok = create_embed(0xff00ff, "VoiceConnection", "bot is disconnect")
    textChann.send({ embeds: [ok] });
}

function split_arg(message) {
    message = message.substring(1);
    const args = message.trim().split(/ +/);
    return args
}

async function playSong(rawRequest, connection, textChann) {
    const {videos} = await yts(rawRequest);
    const song = {
        title: videos[0].title,
        author: videos[0].author,
        url: videos[0].url
    }
    let stream_olla = await play.stream(song.url);
    let resource = createAudioResource(stream_olla.stream, {
        inlineVolume: true,
        inputType: stream_olla.type
    });
    resource.volume.setVolume(1);
    let player = createAudioPlayer();
    player.play(resource);
    connection.subscribe(player);
    ok = song_embed(0xff00ff, song.title, song.url);
    textChann.send({ embeds: [ok] });
}

function checkAndConnect(connection, textChann) {
    try {
        connection;
        ok = create_embed(0xff00ff, "VoiceConnection", "bot is connect")
        textChann.send({ embeds: [ok] });
    } catch (error) {
        textChann.send("unable to connect");
    };
}

function stupidAdminProcedure(object) {
    var found = false;
    let objectText;
    object.guild.channels.cache.forEach(channel => {
        if (found) return channel;
        if (channel.type === 0) {
            objectText = channel;
            found = true;
        }
    });
    objectText.send("One of you idiot admins removed MY channel. Let me fix that real quick.");
    return objectText;
}

function createMyChannel(message) {
    let myChannel = message.guild.channels.cache.find((channel) => channel.name.toLowerCase() === `puttane`);
    if (myChannel!==undefined) return;
    if (message.author!==undefined) {
        if (message.author.id!=clientId) return;
    }
    message.guild.channels.create({
        name: "puttane",
        type: ChannelType.GuildText
    });
}

function checkPeople(channelid, clientId) {
    let people = client.channels.cache.get(channelid).members
    let list = [];
    people.forEach(user => {if (user.id!=clientId) list.push(user.id)});
    return list;
}

function checkPlace(object, file) {
	var found = false;
	let position = 0;
	file.forEach(id => {
		if (id == object) {
			found = true;
			return;
		};
		position++;
	});
	return position-1;
}

module.exports = {
  create_embed: create_embed,
  joins: joins,
  exits: exits,
  split_arg: split_arg,
  song_embed: song_embed,
  playSong: playSong,
  checkAndConnect: checkAndConnect,
  stupidAdminProcedure: stupidAdminProcedure,
  createMyChannel: createMyChannel,
  checkPeople: checkPeople,
  checkPlace: checkPlace
};