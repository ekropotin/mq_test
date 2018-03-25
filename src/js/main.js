require(['appStart'], (start) => {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    start();
  } else {
    document.addEventListener('DOMContentLoaded', (event) => {
      start();
    });
  }
});
