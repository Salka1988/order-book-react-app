import webWorker from '../workers/worker.js';

export class WorkerBuilder {
  worker = null;

  constructor() {
    this.worker = webWorker();
  }

  sendMessage = (msg) => {
    this.worker.postMessage(msg);
  };

  onMessage = (store) => {
    this.worker.onmessage = (e) => {
      console.warn('FROM WORKER DISPATCH');
      store(e.data);
    };
  };

  onTerminate = () => {
    this.worker.terminate();
  };
}
