const { PlayerManager } = require('../lib');
const Players = new PlayerManager();

test('gets the free agents of the season 2021', async () => {
    const r = await Players.getFreeAgents('2021');
    console.log(r);
});