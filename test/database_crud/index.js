const seed_users = require('./seed_users')
const fetch_users = require('./fetch_users')
const clear_users = require('./clear_users')

function hrTimeToMilliseconds(hrTime) {
  const nanoSeconds = hrTime[0] * 1e9 + hrTime[1];
  return parseInt(nanoSeconds/1000000);
}

module.exports = async (execution_count) => {
  const results = [];
  for (let i = 0; i < execution_count; i++) {
    results.push({
      seed_users: hrTimeToMilliseconds(await seed_users.seedData()),
      fetch_users: hrTimeToMilliseconds(await fetch_users.fetchData()),
      clear_users: hrTimeToMilliseconds(await clear_users.clearData()),
    });
  }

  console.log('    seeding 50 users:')
  for (let i = 0; i < execution_count; i++) {
    console.log(`      run ${i+1}: ${results[i].seed_users} ms`);
  }

  console.log('\n    fetching 50 users:')
  for (let i = 0; i < execution_count; i++) {
    console.log(`      run ${i+1}: ${results[i].fetch_users} ms`);
  }

  console.log('\n    deleting 50 users:')
  for (let i = 0; i < execution_count; i++) {
    console.log(`      run ${i+1}: ${results[i].clear_users} ms`);
  }
}
