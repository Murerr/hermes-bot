const Discord = require('discord.js');
const Database = require('../database/database.js');
const axios = require('axios');
module.exports = {
	name: 'newcards',
	description: 'Retrieve all new cards',
	usage: '',
	cooldown: 1,
	execute: async function(channel, args) {

		const current_date = new Date().toISOString().slice(0, 10);
		axios.get('https://api.scryfall.com/cards/search?order=spoiled&q=date>=' + current_date)
			.then(response => {
				if (response.data.data) {
					const data = response.data.data;
					const sets = getUniqueValues(data.map(card => {
						return { code:card.set, setName:card.set_name, setUrl: card.scryfall_set_uri };
					}), 'code');
					sets.forEach(set => {
						Database.sets.get(set.code).then(result => {
							if (result === undefined) {
								Database.sets.set(set.code, set.setName).then(() => {
									channel.send(new Discord.RichEmbed()
										.setColor('#2B253A')
										.setTitle(set.setName)
										.setURL(set.setUrl)
										.setDescription('New Set Released!')
										.setTimestamp());

								}).catch(error => {
									console.log(error);
								});
							}
						});
					});

					data.forEach((element) => {
						Database.cards.get(element.id).then(result => {
							if (result === undefined) {
								Database.cards.set(element.id, element).then(() => {
									channel.send(
										new Discord.RichEmbed()
											.setColor('#800080')
											.setTitle(element.name)
											.setDescription(element.oracle_text)
											.addField('Set', element.set_name, true)
											.setURL(element.scryfall_uri)
											.setImage(element.image_uris.png)
											.setTimestamp(),
									);
								}).catch(error => {
									console.log(error);
								});
							}
						});
					});
				}
			}).catch(error => {
				console.log(error);
			});
	},
};

function getUniqueValues(arr, key) {
	const seen = new Set();
	const out = [];
	let j = 0;
	for(let i = 0; i < arr.length; i++) {
		const item = arr[i];
		if (!seen.has(item[key])) {
			seen.add(item[key]);
			out[j++] = item;
		}
	}
	return out;
}
