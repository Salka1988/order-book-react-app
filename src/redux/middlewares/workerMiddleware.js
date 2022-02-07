import { FETCH_PAIRS, GET_COIN_VALUE, ORDER_TABLE_INIT } from '../actions/types';
import { WorkerBuilder } from '../../workers/WorkerBuilder';

export const createWorkerMiddleware = () => {
  const worker = new WorkerBuilder();

  return (store) => {
    worker.onMessage(store);

    return (action) => {
      switch (action.type) {
        case ORDER_TABLE_INIT: {
          worker.sendMessage(action);
          break;
        }
        case FETCH_PAIRS: {
          worker.sendMessage(action);
          break;
        }

        case GET_COIN_VALUE: {
          worker.sendMessage(action);
          break;
        }
        default:
          return store(action);
      }
    };
  };
};
