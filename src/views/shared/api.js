import clientSocket from 'socket.io-client';

export const API_URL = "http://localhost:4001";
const channelName = "tenant-service";

const socket = clientSocket(`${API_URL}/tenant`);

// export const send = ((data) => {
//   socket.emit('eventToEmit', data, function (error, message) {
//     console.log(data);
//     console.log(error);
//     console.log(message);
//   });
// });

export const subscribe = (newCallback) => {
  socket.on('connect', function () {
    console.log("connected")
  });

  socket.on('disconnect', () => {
    console.log("dead...")
  });

  socket.on("connect_error", (err) => {
    console.log(`connection error: Service not found!`)
  });

  socket.on("tenant", (result) => {
    console.log(result)
    result = JSON.parse(result);
    newCallback(result);
  });
}