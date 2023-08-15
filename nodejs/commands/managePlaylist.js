const fs = require('fs');
const { SlashCommandBuilder } = require('discord.js');
const p = "./playlists.json" ;
const f = require("../commandFunctions.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('manage_playlist')
		.setDescription('Add or remove songs in your playlist')
        .addSubcommand(subcommand => subcommand
            .setName('add_song')
            .setDescription('Add a song in your playlist')
            .addStringOption(option => 
                option.setName('title')
                .setDescription('Title of the song you would like to add')
                .setRequired(true))
            .addStringOption(option => 
                option.setName('author')
                .setDescription('Author of the song you would like to add')
                .setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName('remove_song')
            .setDescription('Remove a song from your playlist') 
            .addIntegerOption(option => option
                .setName('number')
                .setDescription('Number corresponding to the song in your playlist')  
                .setRequired(true))   
        ),
	async execute(interaction) {
        await interaction.deferReply({ephemeral:true});
        const person = interaction.user;
        let fileContent = JSON.parse(fs.readFileSync(p));
        let presence = f.checkPresence(person, fileContent);
        if (!presence) {
            interaction.editReply("You don't have a playlist yet");
            return;
        }
        let position = f.checkPosition(person, fileContent);
        let jsonPath = fileContent.people[position].playlist
        if (interaction.options.getSubcommand()==='add_song') {
            const title = interaction.options.getString('title');
            const author = interaction.options.getString('author');
            const song = {
                title: title,
                author: author
            }
            jsonPath.push(song);
            stringFile = JSON.stringify(fileContent);
            fs.writeFile(p, stringFile, function(error) {if (error) console.log('r')}); 
            interaction.editReply("Song added!");
        } else {
            let number = interaction.options.getInteger('number')-1;
            if (jsonPath.length<number) {
                interaction.editReply("No such song in your playlist");
                return;
            }
            const song = jsonPath[number];
            jsonPath.splice(number,number+1);
            stringFile = JSON.stringify(fileContent);
            fs.writeFile(p, stringFile, function(error) {if (error) console.log('r')}); 
            interaction.editReply(song.title+" by "+song.author+" was removed from your playlist");
        }
	},
};