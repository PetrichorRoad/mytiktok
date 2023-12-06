// import socketIO from 'vue-socket.io'
import ClientSocketIO from 'socket.io-client'
const socket = ClientSocketIO('http://127.0.0.1:3007', {
    query: {},
    transports: ['websocket', 'polling']
})
export default socket