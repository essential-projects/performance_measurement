

const http = require('@essential-projects/http');
const yargs = require('yargs');

const httpClient = new http.HttpClient();

const argv = yargs.argv;

const config = {
  host: argv.host || `http://localhost:8000`,
  route: `datastore/User`,
  seedingRepetition: argv.repeat || 50,
  seedingData: [{
    name: 'someone',
    password: 'something',
    roles: ['A', 'B'],
  }],
};

async function seedData() {
  for (let index = 0; index < config.seedingRepetition; index++) {
    for (const data of config.seedingData) {
      const seedReponse = await httpClient.post(`${config.host}/${config.route}`, data);
    }
  }
}

seedData();
