const { PlayerManager } = require('../lib');
const Players = new PlayerManager();

test('gets the changed players updated since this function was tested', async () => {
    const r = await Players.getChanges(new Date());
    console.log(r);
});