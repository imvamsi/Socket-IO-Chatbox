const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 4000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", function (socket) {
  console.log(' we have comms"');

  socket.on("disconnect", function () {
    console.log("user left");
  });
});

app.use(router);

server.listen(PORT, function () {
  console.log(`server running in PORT ${PORT}`);
});
