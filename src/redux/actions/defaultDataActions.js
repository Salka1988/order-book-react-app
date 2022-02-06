import {
  FETCH_PAIRS,
  GET_COIN_VALUE,
  PAIRS_FETCHED,
  SET_COIN_VALUE,
  SET_PAIR,
  TABLE_SWITCH,
} from './types';

export const toggleTables = (value) => {
  return (dispatch) => {
    dispatch({ type: TABLE_SWITCH, data: value });
  };
};

export const fetchAllPairs = () => ({
  type: FETCH_PAIRS,
});

export const allPairsFetched = (value) => ({
  type: PAIRS_FETCHED,
  payload: value,
});

export const setPair = (value) => {
  return (dispatch) => {
    dispatch({ type: SET_PAIR, data: value });
    dispatch({ type: GET_COIN_VALUE, pair: value });
  };
};

export const getCoinValue = (value) => ({
  type: GET_COIN_VALUE,
  payload: value,
});

export const setCoinValue = (value) => {
  let obj = JSON.parse(value);
  let asksBids = { asks: obj['bids'], bids: obj['asks'] };
  return { type: SET_COIN_VALUE, payload: asksBids };
};
