const { PlayerManager } = require('../lib');
const Players = new PlayerManager();

test('gets the game stats of the player with the id 545361 and the game with the gamePk 662368', async () => {
    const r = await Players.getGameStats(545361, 662368);
    console.log(r);
});