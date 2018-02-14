var assert = require('assert');
const database_crud_test = require('./database_crud/index');

describe('database_crud', async () => {
  it('test', function() {
    this.timeout(10000)
    return database_crud_test(5);
  })
});
