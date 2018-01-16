// https://stackoverflow.com/questions/10406930/how-to-construct-a-websocket-uri-relative-to-the-page-uri

const socket =  new WebSocket(
  (window.location.protocol === 'https:' ? 'ws://' : 'ws://') +
    window.location.host +
    '/ws',
);

export default socket;

//export { getSocket };
