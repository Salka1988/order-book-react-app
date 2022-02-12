export class Singleton {
  map = null;

  constructor() {
    this.map = new Map();
    const instance = this.constructor.instance;
    if (instance) {
      return instance;
    }

    this.constructor.instance = this;
  }

  set(key, value) {
    let params = [key + '@depth20'];
    let msg = {
      method: 'SUBSCRIBE',
      params: params,
      id: 1,
    };

    value.onopen = () => {
      value.send(JSON.stringify(msg));
    };

    value.onerror = () => {
      console.warn('Error by connecting.');
    };

    this.map.set(key, value);
  }

  get(key) {
    return this.map.get(key);
  }

  clear() {
    let key = this.map.keys().next().value;
    let value = this.map.values().next().value;
    let closeMsg = {
      method: 'UNSUBSCRIBE',
      params: [key + '@depth20'],
      id: 312,
    };
    value.send(JSON.stringify(closeMsg));
    value.close();
    this.map.clear();
  }

  getMap() {
    return this.map;
  }
}
