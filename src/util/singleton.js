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
    this.map.set(key, value);
  }

  get(key) {
    return this.map.get(key);
  }

  del(key) {
    this.map.delete(key);
  }

  getMap() {
    return this.map;
  }
}
