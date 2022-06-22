const { PlayerManager } = require('../lib');
const Players = new PlayerManager();

test('gets the career stats of the player with the id 545361', async () => {
    const r = await Players.getCareerStats(545361, 'fielding');
    console.log(r);
});