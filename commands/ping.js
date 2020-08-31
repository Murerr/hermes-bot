module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
		console.log(args);
		if(args.length) {
			message.channel.send('Beep.');
		} else {
			message.channel.send('Pong.');
		}
	},
};
