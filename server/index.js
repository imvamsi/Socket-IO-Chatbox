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

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    //if (error) return callback(error);
    if (error) {
      return callback(error);
    }

    if (!user) {
      return callback("An unknown error occurred.");
    }
    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `Hi ${user.name}!!! welcome to the ${user.room} chatroom`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    console.log("🚀 ~ message:", message);
    const user = getUser(socket.id);
    if (!user) return callback("user not found");
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
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

server.listen(process.env.PORT || 4000, () => {
  console.log(`server running`);
});
