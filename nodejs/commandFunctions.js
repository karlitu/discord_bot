"use strict";
const p = "./playlists.json" ;
const fs = require('fs');
const { EmbedBuilder } = require("discord.js");


function checkPresence(object, file) {
		var found = false;
		file.people.forEach(user => {
			if (user.id == object.id) {
				found = true;
				return;
			};
		});
		return found;
}

function checkPosition(object, file) {
	var found = false;
	let position = 0;
	file.people.forEach(user => {
		while (!found) {
			if (user.id == object.id) {
				found = true;
			};
			position++;
		}
	});
	return position-1;
}

function list_embed(person, file) {
	let list = getPlaylist(file, person);
	const emb = new EmbedBuilder()
	.setColor(0xff00ff)
	.setTitle(person.tag)
	.setThumbnail('https://cdn.discordapp.com/attachments/1138597014578397316/1138951938449350869/2Q.png')
	.setFields(
		{name: "Your playlist", value: list}
	)
	.setAuthor(
		{
			name: "puttane - here's your playlist",
			iconURL: "https://cdn.discordapp.com/attachments/1073986264983937145/1117875655141498961/letter_p.png",
			description: "here are listed all of your songs"
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

function getPlaylist(file, person) {
	let pos = checkPosition(person, file);
	let playlist = file.people[pos].playlist;
	var number = 0;
	var list = '';
	playlist.forEach(song => {
		number++;
		list = (list+number+": "+song.title+" by "+song.author+"\n");
	})
	return list;
}

module.exports = {
	checkPresence: checkPresence,
	checkPosition: checkPosition,
	list_embed: list_embed,
	getPlaylist: getPlaylist
}