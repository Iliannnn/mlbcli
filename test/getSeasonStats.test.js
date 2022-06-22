const { PlayerManager } = require('../lib');
const Players = new PlayerManager();

test('gets the season stats of the player with the id 545361 of the season 2018', async () => {
    const r = await Players.getSeasonStats(545361, 'fielding', '2018');
    console.log(r);
});