const fs = require('fs');
const { SlashCommandBuilder } = require('discord.js');
const p = "./playlists.json" ;
const f = require("../commandFunctions.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('show_playlist')
		.setDescription('Show your playlist'),
	async execute(interaction) {
        await interaction.deferReply({ephemeral:true});
        const person = interaction.user;
        let fileContent = JSON.parse(fs.readFileSync(p));
        let presence = f.checkPresence(person, fileContent);
        if (!presence) {
            interaction.editReply("You don't have a playlist yet");
            return;
        } else {
            pos = f.checkPosition(person, fileContent);
            if (fileContent.people[pos].playlist.length==0) {
                interaction.editReply("Your playlist is empty!");
                return;
            }
        }
        ok = f.list_embed(person, fileContent);
        await interaction.editReply({ embeds: [ok] });
	},
};