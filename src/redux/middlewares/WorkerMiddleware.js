import { FETCH_PAIRS, GET_COIN_VALUE, ORDER_TABLE_INIT } from '../actions/types';
import { WorkerBuilder } from '../../workers/WorkerBuilder';

export const createRenderMiddleware = () => {
  const worker = new WorkerBuilder();

  return (store) => {
    console.warn('store', store);
    worker.onMessage(store);

    return (action) => {
      console.warn('Inside');

      switch (action.type) {
        case ORDER_TABLE_INIT: {
          worker.sendMessage(action);
          break;
        }
        case FETCH_PAIRS: {
          console.warn('In Middleware FETCH_PAIRS');
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
