define([], () => (() => {
  function createYearNode (year) {
    const node = document.createElement('option');
    node.textContent = year;
    return node;
  }

  function initDropDown (node, startValue, endValue, defaultValue) {
    // Clear all children first
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }

    for (let year = startValue; year <= endValue; year++) {
      node.appendChild(createYearNode(year));
    }
    if (defaultValue) {
      node.value = defaultValue;
    }
  }

  return {
    init (stateChangedListener) {
      const startYear = document.getElementById('start-year');
      const endYear = document.getElementById('end-year');
      const radioTemp = document.getElementById('radio-temp');
      const radioPrec = document.getElementById('radio-prec');

      const updateState = () => {
        this.state = { data: radioTemp.checked ? 'temp' : 'prec', startYear: startYear.value, endYear: endYear.value };
        stateChangedListener(this.state);
      };

      initDropDown(startYear, 1881, 2006);
      initDropDown(endYear, 1881, 2006, 2006);

      startYear.addEventListener('change', e => {
        initDropDown(endYear, e.currentTarget.value, 2006);
        updateState();
      }, false);

      endYear.addEventListener('change', e => {
        initDropDown(startYear, 1881, e.currentTarget.value);
        updateState();
      }, false);

      radioTemp.addEventListener('change', updateState, false);
      radioPrec.addEventListener('change', updateState, false);

      // this.state = { data: 'temp', startYear: 1881, endYear: 2006 };
      updateState();
    },

    checkState (knownState) {
      return (knownState.data === this.state.data) &&
        (knownState.startYear === this.state.startYear) &&
        (knownState.endYear === this.state.endYear);
    }
  };
})());
