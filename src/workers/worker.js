import { FETCH_PAIRS, GET_COIN_VALUE, RESTART_SOCKET } from '../redux/actions/types';
import { allPairsFetched, setCoinValue } from '../redux/actions/defaultDataActions';
import axios from 'axios';
import { mergeSort } from '../util/util';
import { Singleton } from '../util/singleton';

let singleton = new Singleton();

const ctx = self;

ctx.onmessage = function receive(event) {
  const request = event.data;
  let response;

  switch (request.type) {
    case GET_COIN_VALUE: {
      let pair = request?.pair?.toLowerCase();
      let prevPair = request?.prevPair?.toLowerCase();

      if (prevPair !== pair) {
        const webSocket = new WebSocket('wss://stream.binance.com:9443/ws');
        singleton.set(pair, webSocket);

        if (prevPair) {
          let closeMsg = {
            method: 'UNSUBSCRIBE',
            params: [prevPair + '@depth20'],
            id: 312,
          };
          singleton.get(prevPair).send(JSON.stringify(closeMsg));
          singleton.get(prevPair).close();
          singleton.get(prevPair).onclose = () => {
            console.warn('websocket close');
            singleton.del(prevPair);
          };
        }

        let params = [pair + '@depth20'];
        let msg = {
          method: 'SUBSCRIBE',
          params: params,
          id: 1,
        };
        singleton.get(pair).onopen = () => {
          singleton.get(pair).send(JSON.stringify(msg));
        };

        singleton.get(pair).onmessage = (message) => {
          const value = message.data;
          let obj = JSON.parse(value);
          let asksBids = { asks: obj['bids'], bids: obj['asks'] };
          ctx.postMessage(setCoinValue(asksBids));
        };
      }

      break;
    }

    case RESTART_SOCKET: {
      break;
    }

    case FETCH_PAIRS: {
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
