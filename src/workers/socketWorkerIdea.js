const ctx = self;

ctx.onmessage = function receive(event) {
  const webSocket = new WebSocket('wss://stream.binance.com:9443/ws');
  webSocket.terminate();
};

export default ctx;
