const fs = require('fs');
const { SlashCommandBuilder } = require('discord.js');
const p = "./playlists.json" ;
const f = require("../commandFunctions.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create_playlist')
		.setDescription('Create your own playlist'),
	async execute(interaction) {
		await interaction.deferReply({ephemeral:true});
		const person = interaction.user;
		let fileContent = JSON.parse(fs.readFileSync(p));
		let playlist = f.checkPresence(person, fileContent);
		if (playlist) {
			interaction.editReply("You already have a playlist");
			return;
		}
		const puttana = {
				id: person.id,
				tag: person.tag,
				playlist: []
			};
		fileContent.people.push(puttana);
		stringFile = JSON.stringify(fileContent);
		fs.writeFile(p, stringFile, function(error) {if (error) console.log('r')}); 
		interaction.editReply("Playlist created!");
	},
};

