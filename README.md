[![Build Status](https://travis-ci.com/Murerr/hermes-bot.svg?token=8eVgur7cjVbRBGtdAp2H&branch=master)](https://travis-ci.com/Murerr/hermes-bot)
# Hermes
Discord Bot made with [DiscordJS](https://github.com/discordjs/discord.js/) using [Scryfall API](https://scryfall.com/docs/api)

## Project setup
```
npm install
```
### Local Tests
```
npm test 
```

### Deployment
With [Travis](https://travis-ci.com/github/Murerr/hermes-bot) and Hosted on [Heroku](https://dashboard.heroku.com/apps/hermes-bot-1)  

Note to self refresh the heroku token every year
```
travis encrypt $(heroku auth:token) --add deploy.api_key --pro
```

### Node Env
```
CHANNEL_ID = <YOUR_CHANNEL_ID>
DATABASE_URL = <POSTGRESQL_CONNECTION_STRING>
DISCORD_TOKEN = <YOUR DISCORD_TOKEN>
PREFIX = '!'
```
