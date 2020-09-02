const Keyv = require('keyv');

const sets = new Keyv('sqlite:///home/rudy/git/hermes/database/database.sqlite', { namespace: 'sets' });
sets.on('error', err => console.error('Keyv connection error:', err));
const cards = new Keyv('sqlite:///home/rudy/git/hermes/database/database.sqlite', { namespace: 'cards' });
cards.on('error', err => console.error('Keyv connection error:', err));

// sets.clear();
// cards.clear();
module.exports = { sets:sets, cards:cards };
