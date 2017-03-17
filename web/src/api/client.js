import io from 'socket.io-client'
const IOT={
    init:function(){
        this.socket = io.connect('127.0.0.1:3000');
    }
}
export default IOT