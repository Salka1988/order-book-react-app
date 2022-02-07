import {
  FETCH_PAIRS,
  GET_COIN_VALUE,
  PAIRS_FETCHED,
  SET_COIN_VALUE,
  SET_DEC,
  SET_PAIR,
  TABLE_SWITCH,
} from './types';

export const toggleTables = (value) => ({
  type: TABLE_SWITCH,
  data: value,
});

export const setDec = (value) => ({
  type: SET_DEC,
  data: value,
});

export const fetchAllPairs = () => ({
  type: FETCH_PAIRS,
});

export const allPairsFetched = (value) => ({
  type: PAIRS_FETCHED,
  payload: value,
});

export const setPair = (value, prevVal) => {
  return (dispatch) => {
    dispatch({ type: SET_PAIR, data: value });
    dispatch({ type: GET_COIN_VALUE, pair: value, prevPair: prevVal });
  };
};

export const getCoinValue = (value) => ({
  type: GET_COIN_VALUE,
  payload: value,
});

export const setCoinValue = (value) => {
  return { type: SET_COIN_VALUE, payload: value };
};
