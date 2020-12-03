import { performance, PerformanceObserver } from 'perf_hooks';

const dayParamRegex = /(--day|-d)=/;
const dayParam = process.argv.find((arg) => dayParamRegex.test(arg));
const day = Number(dayParam?.replace(dayParamRegex, '')) ?? 1;

const puzzleParamRegex = /(--puzzle|-p)=/;
const puzzleParam = process.argv.find((arg) => puzzleParamRegex.test(arg));
const puzzle = Number(puzzleParam?.replace(puzzleParamRegex, '')) ?? 1;

const perfObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(entry.name, entry.duration, 'ms'); // fake call to our custom logging solution
  });
});

perfObserver.observe({ entryTypes: ['measure'] });

function runWithTimer(fn: () => unknown) {
  performance.mark('start');
  const result = fn();
  performance.mark('end');
  console.log('\n\t∘', result, '\n');
  performance.measure('Finished in', 'start', 'end');
}

void (async () => {
  try {
    const puzzleModule = await import(`../day-${day}/puzzle-${puzzle}.js`);
    return runWithTimer(puzzleModule[`puzzle${puzzle}`]);
  } catch (e) {
    console.error(e);
    console.log(`No solution found for day ${day}`);
  }
})();
