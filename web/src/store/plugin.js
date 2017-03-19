import IOT from '../api/client'
export default function createWebSocketPlugin(socket) {
    return store => {
        socket.on('mqtt', data => {
              store.commit('receiveData', data)
            let mes = data.topic.split("/");
            console.log(mes)
            if (mes[3] != IOT.nodeId)
                store.commit(mes[4], data)            
        })      
    }
}