const { PlayerManager } = require('../lib');
const Players = new PlayerManager();

test('searches the player with the name Mike Trout', async () => {
    const r = await Players.search('Mike Trout');
    console.log(r);
});