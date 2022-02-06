import { FETCH_PAIRS, GET_COIN_VALUE, RESTART_SOCKET } from '../redux/actions/types';
import { allPairsFetched, setCoinValue } from '../redux/actions/defaultDataActions';
import axios from 'axios';
import { mergeSort } from '../util/util';

const ctx = self;

ctx.onmessage = function receive(event) {
  const request = event.data;
  let response;

  switch (request.type) {
    case GET_COIN_VALUE: {
      let pair = request.pair.toLowerCase();
      //console.warn(pair);
      const webSocket = new WebSocket('wss://stream.binance.com:9443/ws');
      let params = [pair + '@depth20'];
      let msg = {
        method: 'SUBSCRIBE',
        params: params,
        id: 1,
      };
      webSocket.onopen = () => {
        webSocket.send(JSON.stringify(msg));
      };
      //console.warn('U SOKETU');
      webSocket.onmessage = (message) => {
        const value = message.data;
        ctx.postMessage(setCoinValue(value));
      };
      break;
    }

    case RESTART_SOCKET: {
      break;
    }

    case FETCH_PAIRS: {
      //console.warn('FETCH_PAIRS WORKER');
      axios.get('https://api.binance.com/api/v3/exchangeInfo').then((res) => {
        const pairs = res.data.symbols.map((item) => {
          return item.symbol;
        });
        let sortedPairs = mergeSort(pairs).map((item) => {
          return { title: item };
        });
        ctx.postMessage(allPairsFetched(sortedPairs));
      });

      break;
    }
  }

  if (response) {
    response.catch(() => ctx.postMessage('lala'));
  }
};

export default ctx;
