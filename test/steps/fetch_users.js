const http = require('@essential-projects/http');
const yargs = require('yargs');

const httpClient = new http.HttpClient();

const argv = yargs.argv;

const config = {
  host: argv.host || process.env.host || `http://localhost:8000`,
  route: `datastore/User`,
};

module.exports = {
  title: 'fetch all users',
  method: async () => {
    const getOptions = {
      query: {
        limit: '"ALL"',
      }
    };
    const startTime = process.hrtime();
    const getResponse = await httpClient.get(`${config.host}/${config.route}`, getOptions);
    return process.hrtime(startTime);
  }
};
