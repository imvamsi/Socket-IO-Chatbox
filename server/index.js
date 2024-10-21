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

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    console.log("🚀 ~ message:", message);
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
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

// const express = require("express");
// const socketio = require("socket.io");
// const http = require("http");
// const cors = require("cors");
// const {
//   addUser,
//   getUser,
//   removeUser,
//   getUsersInRoom,
// } = require("./users/users");
// const router = require("./router");

// const app = express();
// const server = http.createServer(app);
// const io = socketio(server, {
//   cors: {
//     origin: "http://localhost:5173", // Change this to your React app's URL
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("New connection established");

//   socket.on("join", ({ name, room }, callback) => {
//     const { error, user } = addUser({ id: socket.id, name, room });

//     // If there's an error, call the callback with the error message
//     if (error) return callback(error);

//     // Join the user to the specified room
//     socket.join(user.room);

//     // Emit welcome message to the new user
//     socket.emit("message", {
//       user: "admin",
//       text: `Hi ${user.name}!!! Welcome to the ${user.room} chatroom.`,
//     });

//     // Broadcast to other users in the room that a new user has joined
//     socket.broadcast
//       .to(user.room)
//       .emit("message", { user: "admin", text: `${user.name} has joined.` });

//     callback(); // Call the callback to acknowledge the join
//   });

//   socket.on("sendMessage", (message, callback) => {
//     const user = getUser(socket.id);

//     // Emit the message to all users in the room
//     io.to(user.room).emit("message", { user: user.name, text: message });

//     callback(); // Acknowledge the message was sent
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//     // Optionally, you can handle user removal or notify others
//   });
// });

// // Set up CORS middleware
// app.use(cors());
// app.use(router);

// // Start the server
// const PORT = process.env.PORT || 4000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
