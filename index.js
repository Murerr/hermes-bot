const fs = require('fs');
const Discord = require('discord.js');
const token = process.env.DISCORD_TOKEN;
const channelID = process.env.CHANNEL_ID;
const prefix = process.env.PREFIX;

// Discord.JS
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Add all commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	console.log('[LOADING]', file);
}

client.login(token).catch(error => {
	console.log(error);
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});

client.on('ready', () => {
	console.log('[Ready!]');
	const channel = client.channels.get(channelID);
	client.commands.get('newcards').execute(channel).then(() => {
		// client.destroy();
	});
});
