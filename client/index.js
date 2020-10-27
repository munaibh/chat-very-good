import './scripts/audio-player'

const importAll = (r) => r.keys().map(r)
importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

if(module.hot) {
  module.hot.accept()
}