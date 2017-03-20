import IOT from '../api/client'
export default function createWebSocketPlugin(socket) {
    return store => {
        socket.on('mqtt', data => {
            let mes = data.topic.split("/");
            store.commit(mes[4], data)
        })
    }
}