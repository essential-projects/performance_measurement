const assert = require('assert');
const testSteps = require('./steps/index'); 

function hrTimeToMilliseconds(hrTime) {
  const nanoSeconds = hrTime[0] * 1e9 + hrTime[1];
  return parseInt(nanoSeconds/1000000);
}

function median(sortedValues) {
  const center = Math.floor(sortedValues.length/2);
  if(sortedValues.length % 2 !== 0) {
    return sortedValues[center];
  }
    
  return (sortedValues[center-1] + sortedValues[center]) / 2.0;
}

async function runTest(steps, executionCount = 5) {
  const results = [];
  for (let exectionNumber = 0; exectionNumber < executionCount; exectionNumber++) {
    const result = []
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      result[stepIndex] = hrTimeToMilliseconds(await steps[stepIndex].method())
    }
    results.push(result);
  }
  
  for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
    if (stepIndex > 0) {
      console.log()
    }
    console.log(`  ${steps[stepIndex].title}`)
    const stepResults = [];
    for (let exectionNumber = 0; exectionNumber < executionCount; exectionNumber++) {
      stepResults.push(results[exectionNumber][stepIndex]);
      console.log(`    run ${exectionNumber+1}: ${results[exectionNumber][stepIndex]} ms`);
    }

    stepResults.sort();
    console.log(`    ${stepResults[0]} ms | ${median(stepResults)} ms | ${stepResults[stepResults.length - 1]} ms`);
  }
}

const describe = (title, callback) => {
  console.log(title)
  callback();
}

describe('database', () => {
  return runTest([
    testSteps.seed_users,
    testSteps.fetch_users,
    testSteps.clear_users
  ], 5);
});
