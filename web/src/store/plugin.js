export default function createWebSocketPlugin (socket) {
  return store => {
    socket.on('mqtt', data => {
    //   store.commit('receiveData', data)
        let mes = data.topic.split("/");
        console.log(mes[4]);
         store.commit(mes[4], data)
    })
    // store.subscribe(mutation => {
    //   if (mutation.type === 'UPDATE_DATA') {
    //     socket.emit('update', mutation.payload)
    //   }
    // })
  }
}