export const selectToggleTable = (state) => state.defaultReducer.tableSwitch;
export const selectAllPairs = (state) => state.defaultReducer.pairs;
export const selectSetPair = (state) => state.defaultReducer.setPair;
export const selectCoinValues = (state) => state.defaultReducer.coinValues;
export const selectCoinValuesAsks = (state) => state.defaultReducer.coinValues?.asks;
export const selectCoinValuesBids = (state) => state.defaultReducer.coinValues.bids;
