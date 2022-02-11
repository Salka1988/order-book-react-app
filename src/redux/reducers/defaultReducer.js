import {
  ORDER_TABLE_INIT,
  PAIRS_FETCHED,
  SET_COIN_VALUE,
  SET_CONNECTED,
  SET_DEC,
  SET_PAIR,
  TABLE_SWITCH,
} from '../actions/types';

let initialState = {
  tableSwitch: 'B',
  pairs: [],
  setPair: '',
  coinValues: {
    asks: [],
    bids: [],
  },
  setDec: '2',
  connected: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CONNECTED: {
      break;
    }
    case PAIRS_FETCHED:
      return { ...state, pairs: action.payload };
    case SET_DEC:
      return { ...state, setDec: action.data };
    case TABLE_SWITCH:
      return { ...state, tableSwitch: action.data };
    case SET_PAIR:
      return { ...state, setPair: action.data };
    case SET_COIN_VALUE:
      return {
        ...state,
        coinValues: {
          asks: action.payload.asks,
          bids: action.payload.bids,
        },
        connected: true,
      };
    case ORDER_TABLE_INIT:
      return { ...state, test: action.data };
    default:
      return state;
  }
};
