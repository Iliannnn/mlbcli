'use strict';
const { Api, Error, TypeError } = require('../index');

/**
 * Class for managing players.
 * @class PlayerManager
 * @extends Api
 */
class PlayerManager extends Api {
    /**
     * Search a player by a keyword
     * @param {String} keyword The keyword of the player to search
     * @returns {PlayerInfo[]} An array with the info of the player(s) matching the keyword 
     * @throws {TypeError} If the keyword is not a string
     */
    async search(keyword) {
        if (typeof keyword !== 'string') throw new TypeError('KEYWORD_NOT_STRING', 'The keyword must be a string');
        const r = await this.request(`${this.base}/${this.version}/sports/1/players`);

        let players = [];
        for (let p in r.data.people) {
            for (let v in Object.values(r.data.people[p])) {
                if (Object.values(r.data.people[p])[v].toString().toLowerCase().includes(keyword.toLowerCase())) {
                    players.push(r.data.people[p]);
                    break;
                }
            }
        }

        return players;
    }

    /**
     * Get the info of a player
     * @param {Number} id The id of the player to get
     * @returns {PlayerInfo} The info of the player with corresponding id
     * @throws {TypeError} If the id is not a number
     * @throws {Error} If the player with the id doesn't exist
     */
    async get(id) {
        if (typeof id !== 'number') throw new TypeError('ID_NOT_NUMBER', 'The id must be a number');
        const r = await this.request(`${this.base}/${this.version}/people/${id}`)
            .catch(err => {
                throw new Error('PLAYER_NOT_FOUND', `Cannot find the player with the id ${id}`);
            });

        return r.data.people[0];
    }

    /**
     * Get the stats of a player in the given season
     * @param {Number} id The id of the player to get the season stats of
     * @param {('hitting'|'pitching'|'fielding')} type What type of stats to get
     * @param {String} [season=2022] The season year to get the stats of
     * @returns {PlayerSeasonStats[]} Array with the stats of the player with corresponding id in the given season
     * @throws {TypeError} If the id is not a number
     * @throws {TypeError} If the type is not a string
     * @throws {Error} If no type is given or if the type is not one of the three types
     * @throws {Error} If the player with the id doesn't exist
     * @throws {Error} If the season year is not a string
     * @throws {Error} If the season year is not a valid year
     */
    async getSeasonStats(id, type, season = '2022') {
        if (!type) throw new Error('NO_TYPE_GIVEN', 'No type given');
        if (typeof id !== 'number') throw new TypeError('ID_NOT_NUMBER', 'The id must be a number');
        if (typeof type !== 'string') throw new TypeError('TYPE_NOT_STRING', 'The type must be a string');
        if (type !== 'hitting' && type !== 'pitching' && type !== 'fielding') throw new TypeError('INVALID_TYPE', 'The type must be either hitting, pitching or fielding');
        if (typeof season !== 'string') throw new TypeError('SEASON_NOT_STRING', 'The season must be a string');
        if (!season.match(/^\d{4}$/)) throw new Error('INVALID_SEASON', 'The season must be a valid year');

        const r = await this.request(`${this.base}/${this.version}/people/${id}?hydrate=stats(group=[${type}],type=[season],${season ? `season=${season}` : ''})`)
            .catch(err => {
                throw new Error('PLAYER_NOT_FOUND', `Cannot find the player with the id ${id}`);
            });

        if (!r.data.people[0].stats) throw new Error('STATS_NOT_FOUND', `The player has no ${type} stats in the season ${season}`);

        return r.data.people[0].stats;
    }

    /**
     * Get the career stats of a player in the given season
     * @param {Number} id The id of the player to get the career stats of
     * @param {('hitting'|'pitching'|'fielding')} type What type of stats to get
     * @returns {PlayerCareerStats[]} Array with the career stats of the player with corresponding id
     * @throws {TypeError} If the id is not a number
     * @throws {TypeError} If the type is not a string
     * @throws {Error} If no type is given or if the type is not one of the three types
     * @throws {Error} If the player with the id doesn't exist
     */
    async getCareerStats(id, type) {
        if (!type) throw new Error('NO_TYPE_GIVEN', 'No type given');
        if (typeof id !== 'number') throw new TypeError('ID_NOT_NUMBER', 'The id must be a number');
        if (typeof type !== 'string') throw new TypeError('TYPE_NOT_STRING', 'The type must be a string');
        if (type !== 'hitting' && type !== 'pitching' && type !== 'fielding') throw new TypeError('INVALID_TYPE', 'The type must be either hitting, pitching or fielding');

        const r = await this.request(`${this.base}/${this.version}/people/${id}?hydrate=stats(group=[${type}],type=[career])`)
            .catch(err => {
                throw new Error('PLAYER_NOT_FOUND', `Cannot find the player with the id ${id}`);
            });

        if (!r.data.people[0].stats) throw new Error('STATS_NOT_FOUND', `The player has no ${type} career stats`);

        return r.data.people[0].stats;
    }

    /**
     * Get the game stats of a player of the given game
     * @param {Number} id The id of the player to get the game stats of
     * @param {Number} gamePk The pk of the game to get the stats of
     * @returns {PlayerGameStats[]} The game stats of the player with corresponding id in the given game
     * @throws {TypeError} If the id is not a number
     * @throws {TypeError} If the gamePk is not a number
     * @throws {Error} If the player with the id doesn't exist
     * @throws {Error} If the game with the gamePk doesn't exist
     * @throws {Error} If the player has no game stats in the game with the gamePk
     */
    async getGameStats(id, gamePk) {
        if (typeof id !== 'number') throw new TypeError('ID_NOT_NUMBER', 'The id must be a number');
        if (typeof gamePk !== 'number') throw new TypeError('GAME_PK_NOT_NUMBER', 'The gamePk must be a number');

        const p = await this.get(id)
            .catch(err => {
                throw new Error('PLAYER_NOT_FOUND', `Cannot find the player with the id ${id}`);
            });

        const r = await this.request(`${this.base}/${this.version}/people/${id}/stats/game/${gamePk}`);

        if (r.data.stats.length === 0) throw new Error('STATS_NOT_FOUND', `The player has no game stats in the game with the gamePk ${gamePk}`);
        
        let i = 0;
        r.data.stats.forEach(s => {
            if (s.splits?.length > 0) i++;
        });

        if (i === 0) throw new Error('STATS_NOT_FOUND', `The player with the id ${id} has no game stats in the game with the gamePk ${gamePk}`);

        return r.data.stats;
    }

    /**
     * Get the free agents of the given season
     * @param {String} [season='2022'] The season year to get the free agents of
     * @returns {FreeAgent[]} Array with the info of the free agents in the given season
     * @throws {TypeError} If the season year is not a string
     * @throws {Error} If the season year is not a valid year
     */
    async getFreeAgents(season = '2022') {
        if (typeof season !== 'string') throw new TypeError('SEASON_NOT_STRING', 'The season must be a string');
        if (!season.match(/^\d{4}$/)) throw new Error('INVALID_SEASON', 'The season must be a valid year');

        const r = await this.request(`${this.base}/${this.version}/people/freeAgents?season=${season}`)
            .catch(err => {
                throw new Error('FREE_AGENTS_NOT_FOUND', `Cannot find the free agents in the season ${season}`);
            });

        return r.data.freeAgents;
    }

    /**
     * Get changed players updated since the given date
     * @param {Date} updatedSince The date to get the changed players updated since
     * @returns {PlayerInfo[]} Array with the info of the changed players
     * @throws {TypeError} If the date is not a Date
     * @throws {Error} If the date is not given
     * @throws {Error} If the date is not a valid date
     * @throws {Error} If the date is in the future
     * @throws {Error} If there aren't any changed players found since the given date
     */
    async getChanges(updatedSince) {
        if (!updatedSince) throw new Error('NO_DATE_GIVEN', 'No date given');
        if (typeof updatedSince !== 'object' || !(updatedSince instanceof Date)) throw new TypeError('DATE_NOT_DATE', 'The date must be a Date');
        if (updatedSince.getTime() > Date.now()) throw new Error('DATE_IN_FUTURE', 'The date must be in the past');

        const r = await this.request(`${this.base}/${this.version}/people/changes?updatedSince=${updatedSince.toISOString()}`)
            .catch(err => {
                throw new Error('CHANGES_NOT_FOUND', `Cannot find the changed players updated since ${updatedSince.toISOString()}`);
            });

        return r.data.people;
    }
}

module.exports = { PlayerManager };