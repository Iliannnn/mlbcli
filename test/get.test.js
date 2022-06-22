const { PlayerManager } = require('../lib');
const Players = new PlayerManager();

test('gets the player with the id 545361', async () => {
    const r = await Players.get(545361);
    console.log(r);
});