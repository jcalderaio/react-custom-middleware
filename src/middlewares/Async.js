export default function ({ dispatch }) {
  return next => action => {
    // if action does not have payload or does not have a .then property, we dont care about it.
    // and send it on.
    if (!action.payload || !action.payload.then) {
      return next(action);
    }
    action.payload.then(response => {
      // Create an action with the old type, but the new response data
      const newAction = { ...action, payload: response };
      dispatch(newAction);
    });
  };
}
