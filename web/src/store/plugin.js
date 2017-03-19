import IOT from '../api/client'
export default function createWebSocketPlugin(socket) {
    return store => {
        socket.on('mqtt', data => {
            //   store.commit('receiveData', data)
            let mes = data.topic.split("/");
                store.commit(mes[4], data)
            if(data){
                //回包
                // socket.emit("")
            }          
        })      
    }
}