const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

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

io.on("connection", function (socket) {
  console.log(' we have comms"');

  socket.on("join", function ({ name, room }, callback) {
    console.log("🚀 ~ room:", room);
    console.log("🚀 ~ name:", name);
    const error = true;
    // if (error) {
    //   callback({ error: "error occured" });
    // }
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
