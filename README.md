# BotsShelter

This package will get bots info from the BotsShelter API and parse it for you.
To initialize it, do the following:

```javascript
const Client = require('botsshelter');

const client = new Client('YOUR BOTSSHELTER TOKEN');
```

## Methods

### Get
```javascript
client.get('SOME DISCORD BOT ID')
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
```

You can obviously use the async/await syntax.
The function will return the bot data or undefined if no bot was found with the provided ID. 

#### Returned Data
```json5
{
  id: 'Discord ID',
  owner: 'Discord ID',
  collaborators: ['ID 1', 'ID 2', 'etc'],
  description: 'A description',
  invitelink: 'A link',
  supportserver: 'A Discord invite',
  website: 'A link',
  library: 'The Discord library',
  votes: 2, // or other number,
  addedat: 1234 // date in ms
}
```

### Vote
```javascript
client.vote('SOME DISCORD BOT ID')
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
```

#### Returned Data

`true` if successfully voted.
`false` if the bot was not found, or you were rate limited. You can only vote every 12 hours.