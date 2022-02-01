export function memoizeState(state, target) {
  const { value, name } = target;
  let initialState;
  let counter = 0;

  function getCurrentState() {
    if (!counter) {
      initialState = state;
    }
  }

  getCurrentState();

  function updateState() {
    counter++;

    return { ...initialState, [name]: value };
  }

  return updateState();
}
