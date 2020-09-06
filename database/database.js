const Keyv = require('keyv');
const { Client } = require('pg');


const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});
client.connect();
const uri = 'postgres://' + client.user + ':' + client.password + '@' + client.host + ':' + client.port + '/' + client.database + '?ssl=true';
const sets = new Keyv(uri, { table: 'sets' });
sets.on('error', err => {
	console.error('Keyv sets connection error:', err.stack);
});

const cards = new Keyv(uri, { table: 'cards' });
cards.on('error', err =>{
	console.error('Keyv cards connection error:', err.stack);
});


module.exports = { sets:sets, cards:cards };
