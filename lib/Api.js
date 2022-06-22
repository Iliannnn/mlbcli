'use strict';
const axios = require('axios').default;

class Api {
    constructor(base = 'https://statsapi.mlb.com/api', version = 'v1') {
        this.base = base;
        this.version = version;
        this.request = axios;
    }
}

module.exports = { Api };