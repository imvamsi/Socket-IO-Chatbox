const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const {
  addUser,
  getUser,
  removeUser,
  getUsersInRoom,
} = require("./users/users");
const router = require("./router");
const { format } = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:5173", // Change this to your React app's URL
    methods: ["GET", "POST"],
    //allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

io.on("connection", function (socket) {
  console.log(' we have comms"');

  socket.on("join", function ({ name, room }, callback) {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) callback(error);
    socket.emit("message", {
      user: admin,
      text: `Hi ${user.name}!!! welcome to the ${user.room} chatroom`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined` });
    socket.join(user.room);
    callback();
  });
  socket.on("disconnect", function () {
    console.log("user left");
  });
});

app.use(router);
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Allow requests from your Vite app
//     methods: ["GET", "POST"],
//     credentials: true, // Allow credentials
//   })
// );

app.use(cors());

server.listen(process.env.PORT || 4000, function () {
  console.log(`server running`);
});
