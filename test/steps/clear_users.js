const http = require('@essential-projects/http');
const yargs = require('yargs');

const httpClient = new http.HttpClient();

const argv = yargs.argv;

const config = {
  host: argv.host || process.env.host || `http://localhost:8000`,
  route: `datastore/User`,
};

module.exports = {
  title: 'clear all users',
  method: async () => {
    const getOptions = {
      query: {
        limit: '"ALL"',
      },
    };
    const getResponse = await httpClient.get(`${config.host}/${config.route}`, getOptions);
    let result;
    try {
      result = JSON.parse(getResponse.result);
    } catch (e) {
      result = getResponse.result;
    }
    const startTime = process.hrtime();
    for (const entry of result.data) {
      const deleteResponse = await httpClient.delete(`${config.host}/${config.route}/${entry.id}`);
    }
    return process.hrtime(startTime);
  }
};
