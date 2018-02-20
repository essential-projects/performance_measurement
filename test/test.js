const assert = require('assert');
const testSteps = require('./steps/index'); 

function hrTimeToMilliseconds(hrTime) {
  const nanoSeconds = hrTime[0] * 1e9 + hrTime[1];
  return parseInt(nanoSeconds/1000000);
}

function median(sortedValues) {
  const center = Math.floor(sortedValues.length/2);
  const lengthIsEven = sortedValues.length % 2 === 0;
  if(lengthIsEven) {
    return (sortedValues[center-1] + sortedValues[center]) / 2.0;
  }
  return sortedValues[center];
}

async function runTest(steps) {
  const result = [];
  for (const step of steps) {
    result.push(hrTimeToMilliseconds(await step.method()));
  }

  return result;
}

function getStepRunsFromTestResults(testResults, stepIndex) {
  return testResults.map((testRun) => {
    return testRun[stepIndex];
  });
}

function printStepRuns(stepResults) {
  stepResults.forEach((stepResult, exectionNumber) => {
    console.log(`    run ${exectionNumber+1}: ${stepResult} ms`);
  })
}

function printStepRunsSummary(stepResults) {
  const sortedResults = stepResults.slice(0).sort((a, b) => {
    return a - b;
  });

  const fastestRun = stepResults[0];
  const medianResult = median(stepResults);
  const slowestRun = stepResults[stepResults.length - 1];

  console.log(`    ${fastestRun} ms | ${medianResult} ms | ${slowestRun} ms`);
}

function printTestResults(testSteps, testResults) {
  testSteps.forEach((testStep, stepIndex) => {
    if (stepIndex > 0) {
      console.log()
    }

    console.log(`  ${testStep.title}`)

    const stepResults = getStepRunsFromTestResults(testResults, stepIndex);
    printStepRuns(stepResults);
    printStepRunsSummary(stepResults)
  });
}

async function runTests(steps, executionCount = 5) {
  const results = [];
  for (let exectionNumber = 0; exectionNumber < executionCount; exectionNumber++) {
    results.push(await runTest(steps));
  }

  printTestResults(steps, results);
}

function describe(title, callback) {
  console.log(title)
  callback();
}

describe('datastore endpoint test', () => {
  return runTests([
    testSteps.seed_users,
    testSteps.fetch_users,
    testSteps.clear_users
  ], 5);
});
