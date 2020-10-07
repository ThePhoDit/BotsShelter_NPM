# BotsShelter

This package will get bots info from the BotsShelter API and parse it for you.
It has a single function, that is:

```javascript
const { get } = require('botsshelter');

get('SOME DISCORD BOT ID')
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
```
You can obviously use the async/await syntax.
The function will return the bot data or undefined if no bot was found with the provided ID. 

### Returned Data
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