export class Singleton {
  map = null;
  mapStates = null;

  constructor() {
    this.map = new Map();
    this.mapStates = new Map();
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

  setMapState(key, value) {
    this.mapStates.set(key, value);
  }

  getMapStateVal(key) {
    return this.mapStates.get(key);
  }

  delMapState(key) {
    this.map.delete(key);
  }

  getMapState() {
    return this.mapStates;
  }
}
