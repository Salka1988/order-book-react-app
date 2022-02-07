export const loggerMiddleware = (storeAPI) => (next) => (action) => {
  console.warn('dispatching', action);
  let result = next(action);
  console.warn('next state', storeAPI.getState());
  return result;
};
