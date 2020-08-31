const Discord = require('discord.js');
const axios = require('axios');
module.exports = {
	name: 'newcards',
	description: 'Retrieve all new cards',
	usage: '',
	cooldown: 1,
	execute: async function(message, args) {
		console.log(message);
		// axios.get('https://api.scryfall.com/sets/cmr')
		// 	.then(response => {
		// 		// console.log(response);
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 	});
		// https://scryfall.com/sets/cmr?order=spoiled
		axios.get('https://api.scryfall.com/cards/search?order=spoiled&q=set=cmr')
			.then(response => {
				if (response.data.data) {
					response.data.data.forEach((element) => {
						console.log(element.name);

					});
				}
				// console.log(response.data);
				// console.log(response.data.data);
				// for (const card of response.data) {
				// 	console.log(card);
				// }
				// response.data.for(card in cardlist => {
				// 	console.log(card.name);
				// });
			})
			.catch(error => {
				console.log(error);
			});

		// https://api.scryfall.com/cards/search?
		console.log(message);
		console.log(args);
	},
};
