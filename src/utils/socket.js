import io from 'socket.io-client'
import Vue from 'vue'

export default function socketIo ({ prefix = 'https://www.aituoli.com', ...opt }) {
  let options = {
    path: '/10000/socket.io',
    'reconnection': false,
    'force new connection': true,
    'transports': ['websocket', 'polling'],
    ...opt
  }
  let socket = io(prefix, options)

  // 连接成功
  socket.on('connect', function (data) {
    console.log('connect');
  });

  // 丢失连接时触发
  socket.on('disconnect', function (data) {
    console.log("disconnect");
  });

  // 重新连接成功
  socket.on('reconnect', function () {
    console.log('reconnection');
  });

  // 重新连接失败
  socket.on('reconnect_failed', function () {
    console.log('reconnect_failed');
  });

  Vue.prototype.socket = socket
}