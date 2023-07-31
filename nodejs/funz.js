"use strict";
const {EmbedBuilder} = require("discord.js");
const play = require('play-dl');
const ytdl = require('ytdl-core');
const { video_basic_info, stream } = require('play-dl');
const { createAudioPlayer, joinVoiceChannel, createAudioResource } = require('@discordjs/voice');

let ok = null;

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

function song_embed(color, title, author, videoURL) {
    const emb = new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .setDescription(author)
    .setThumbnail('https://e7.pngegg.com/pngimages/95/768/png-clipart-musical-note-staff-musical-theatre-musical-notes-text-magenta.png')
    .setAuthor(
        {
            name: "puttane - now playing a song",
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

function joins(message) {
    const channel = message.member.voice.channel;
    const connection = joinVoiceChannel  ({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
    console.log("connection");
    /*
    ok = create_embed(0xff00ff, "VoiceConnection", "bot is connect")
    message.channel.send({ embeds: [ok] });
    */
    return connection;
}

function exits(message, connection) {
    ok = create_embed(0xff00ff, "VoiceConnection", "bot is disconnect")
    message.channel.send({ embeds: [ok] });
    connection.destroy();
}

function split_arg(message) {
    message = message.substring(1);
    const args = message.trim().split(/ +/);
    return args
}

async function playSong(videoURL) {

    let stream_olla = await play.stream(videoURL);
    let resource = createAudioResource(stream_olla.stream, {
        inlineVolume: true,
        inputType: stream_olla.type
    });
    resource.volume.setVolume(1);

    let player = createAudioPlayer();
    player.play(resource);
    connection.subscribe(player);
    
    player
    .on('error', error => {
        console.log(error)
    });
}

function songInfo(videoURL, message) {
    ytdl.getInfo(videoURL).then(info => {
        let title = info.videoDetails.title;
        let author = info.videoDetails.author.name;
        ok = song_embed(0xff00ff, title, author, videoURL);
        message.channel.send({ embeds: [ok] });
    });
}

module.exports = {
  create_embed: create_embed,
  joins: joins,
  exits: exits,
  split_arg: split_arg,
  song_embed: song_embed,
  songInfo: songInfo,
  playSong: playSong
};