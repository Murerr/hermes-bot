/* eslint-env mocha */
const assert = require('assert');
require('dotenv').config();

describe('Test Suit', function() {
	let fs;
	let Discord;
	let token;
	let channelID;
	let dclient;
	let axios;
	before(function(done) {
		fs = require('fs');
		Discord = require('discord.js');
		token = process.env.DISCORD_TOKEN;
		channelID = process.env.CHANNEL_ID;
		dclient = new Discord.Client();
		axios = require('axios');
		done();
	});

	describe('#Init', function() {
		it('should return true when all const are not undefined', function() {
			const array = [fs, Discord, token, channelID, dclient, axios];
			array.forEach(item => {
				assert.notStrictEqual(item, undefined);
			});
		});
		it('should return true when logged in', function(done) {
			dclient.login(token).then(() => {
				done();
			}).catch(error => {
				done(error);
			});
		});
		it('should return true when cards spoiled exist', async function() {
			const current_date = new Date().toISOString().slice(0, 10);
			return axios.get('https://api.scryfall.com/cards/search?order=spoiled&q=date>=' + current_date)
				.then(response => {
					assert.notStrictEqual(response.data, undefined);
				})
				.catch((err) => {throw new Error(err); });

		});
	});

	describe('Database & Keyv', function() {
		const { Client } = require('pg');
		const Keyv = require('keyv');
		let pgclient;
		before(function(done) {
			pgclient = new Client({
				connectionString: process.env.DATABASE_URL,
				ssl: {
					rejectUnauthorized: false,
				},
			});
			done();
		});

		it('should return true when connecting to database', function(done) {
			pgclient.connect().then(done()).catch((err) => done(err));
		});
		describe('Sets', function() {
			let sets;
			let uri;
			before(function(done) {
				uri = 'postgres://' + pgclient.user + ':' + pgclient.password + '@' + pgclient.host + ':' + pgclient.port + '/' + pgclient.database + '?ssl=true';
				sets = new Keyv(uri, { table: 'sets' });
				done();
			});
			it('should return true when creating a new set', async function() {
				return sets.set('foo', 'test')
					.then((result) => {assert.strictEqual(result, true);})
					.catch((err) => {throw new Error(err); });
			});
			it('should return true when getting something else than the created set', async function() {
				return sets.get('foo')
					.then((result) => {assert.notStrictEqual(result, 'notTEst');})
					.catch((err) => {throw new Error(err); });
			});
			it('should return true when getting the set', async function() {
				return sets.get('foo')
					.then((result) => assert.strictEqual(result, 'test'))
					.catch((err) => {throw new Error(err); });
			});
			it('should return true when deleting the set', async function() {
				return sets.delete('foo')
					.then((result) => assert.strictEqual(result, true))
					.catch((err) => {throw new Error(err); });
			});
		});
		describe('Cards', function() {
			let cards;
			let uri;
			before(function(done) {
				uri = 'postgres://' + pgclient.user + ':' + pgclient.password + '@' + pgclient.host + ':' + pgclient.port + '/' + pgclient.database + '?ssl=true';
				cards = new Keyv(uri, { table: 'cards' });
				done();
			});
			it('should return true when creating a new card', async function() {
				return cards.set('foo', 'test')
					.then((result) => {assert.strictEqual(result, true);})
					.catch((err) => {throw new Error(err); });
			});
			it('should return true when creating the created set', async function() {
				return cards.get('foo')
					.then((result) => {assert.notStrictEqual(result, 'notTEst');})
					.catch((err) => {throw new Error(err); });
			});
			it('should return true when failing to get the card', async function() {
				return cards.get('foo')
					.then((result) => !assert.strictEqual(result, 'test'))
					.catch((err) => {throw new Error(err); });
			});
			it('should return true when deleting the card', async function() {
				return cards.delete('foo')
					.then((result) => assert.strictEqual(result, true))
					.catch((err) => {throw new Error(err); });
			});
		});
	});
});
